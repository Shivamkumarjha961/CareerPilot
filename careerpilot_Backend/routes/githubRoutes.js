const express = require('express');
const axios = require('axios');
const Github = require('../models/githubModel');

const router = express.Router();


// ================= HISTORY =================
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await Github.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {
    console.error('History Fetch Error:', error.message);

    res.status(500).json({
      error: 'Failed to fetch GitHub history',
    });
  }
});


// ================= ANALYZE GITHUB =================
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username.trim();

    let response;
    let data;

    // Try fetching with token if it is provided
    if (process.env.GITHUB_TOKEN) {
      try {
        response = await axios.get(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              'User-Agent': 'CareerPilot-App',
            },
          }
        );
        data = response.data;
      } catch (tokenError) {
        // If token is invalid (401 Bad Credentials), fall back to public unauthenticated request
        if (tokenError.response?.status === 401) {
          console.warn('GitHub token in .env is invalid (401). Retrying request without token...');
          response = await axios.get(
            `https://api.github.com/users/${username}`,
            {
              headers: {
                'User-Agent': 'CareerPilot-App',
              },
            }
          );
          data = response.data;
        } else {
          // Re-throw if it's another error type (like 404, 403, 429) to be handled by the main catch block
          throw tokenError;
        }
      }
    } else {
      // Fetch without token
      response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            'User-Agent': 'CareerPilot-App',
          },
        }
      );
      data = response.data;
    }

    if (!data.login) {
      return res.status(404).json({
        error: 'GitHub user not found',
      });
    }

    // ================= SAVE HISTORY =================
    if (req.query.userId && req.query.userId.length === 24) {
      try {
        await Github.create({
          userId: req.query.userId,
          username,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          profile: data.html_url,
        });
      } catch (dbError) {
        console.error('DB Save Error:', dbError.message);
      }
    }

    // ================= RESPONSE =================
    res.json({
      username: data.login,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      profile: data.html_url,
      avatar: data.avatar_url,
    });

  } catch (error) {
    console.error('GitHub Error:', error.response?.data || error.message);

    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ error: 'GitHub user not found' });
      }
      if (status === 403 || status === 429) {
        return res.status(403).json({ error: 'Rate limit exceeded' });
      }
      return res.status(status).json({ error: 'GitHub API unavailable' });
    } else if (error.request) {
      return res.status(503).json({ error: 'GitHub API unavailable' });
    } else {
      return res.status(500).json({ error: 'Server unavailable' });
    }
  }
});

module.exports = router;