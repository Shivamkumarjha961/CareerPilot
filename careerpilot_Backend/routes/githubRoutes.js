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

    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({
        error: 'GitHub token missing in .env',
      });
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'CareerPilot-App',
        },
      }
    );

    const data = response.data;

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

    res.status(500).json({
      error: 'GitHub fetch failed',
    });
  }
});

module.exports = router;