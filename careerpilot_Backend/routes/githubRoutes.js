const express = require('express');
const axios = require('axios');
const Github = require('../models/githubModel');

const router = express.Router();

// Simple in-memory cache for GitHub user profiles and repo stats
// Key: username (lowercase), Value: { data, expiry }
const cache = new Map();

// Clean up expired cache entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (value.expiry <= now) {
      cache.delete(key);
    }
  }
}, 10 * 60 * 1000);


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
    const usernameKey = username.toLowerCase();

    // 1. Check Caching Layer
    const cachedData = cache.get(usernameKey);
    if (cachedData && cachedData.expiry > Date.now()) {
      console.log(`[Cache Hit] Serving cached profile for GitHub user: ${usernameKey}`);
      return res.json(cachedData.data);
    }

    // 2. Validate Server Environment Variable Configuration
    if (!process.env.GITHUB_TOKEN) {
      console.error('[Config Error] GITHUB_TOKEN environment variable is missing on the server.');
      return res.status(500).json({
        error: 'GitHub service is not configured correctly on the server. Please contact support.'
      });
    }

    // 3. Authenticated GitHub API Request
    console.log(`[API Fetch] Fetching live profile for GitHub user: ${usernameKey}`);
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'CareerPilot-App',
        },
        timeout: 10000 // 10 seconds timeout
      }
    );

    const data = response.data;

    if (!data.login) {
      return res.status(404).json({
        error: 'GitHub user not found',
      });
    }

    const resultData = {
      username: data.login,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      profile: data.html_url,
      avatar: data.avatar_url,
    };

    // 4. Update Caching Layer (1-hour cache duration)
    cache.set(usernameKey, {
      data: resultData,
      expiry: Date.now() + 60 * 60 * 1000 // 1 hour
    });

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
    res.json(resultData);

  } catch (error) {
    console.error('GitHub API Request Failed:', error.response?.data || error.message);

    if (error.response) {
      const status = error.response.status;
      const headers = error.response.headers;

      // Extract rate limits info
      const rateLimitRemaining = headers ? headers['x-ratelimit-remaining'] : null;
      const rateLimitReset = headers ? headers['x-ratelimit-reset'] : null;

      // Detect Rate-limiting
      if ((status === 403 || status === 429) && rateLimitRemaining === '0') {
        const resetTime = rateLimitReset ? new Date(Number(rateLimitReset) * 1000).toLocaleString() : 'unknown reset time';
        console.error(`[Rate Limit Exceeded] GitHub rate limit reached. Reset Scheduled At: ${resetTime}`);
        return res.status(429).json({
          error: 'GitHub API rate limit exceeded. Please try again later.'
        });
      }

      if (status === 401 || status === 403) {
        console.error('[Auth Error] GITHUB_TOKEN is either invalid or unauthorized.');
        return res.status(status).json({
          error: 'GitHub API authentication failed. Access forbidden.'
        });
      }

      if (status === 404) {
        return res.status(404).json({ error: 'GitHub user not found' });
      }

      return res.status(status).json({ error: error.response.data?.message || 'GitHub API unavailable' });
    } else if (error.request) {
      return res.status(503).json({ error: 'GitHub API unavailable' });
    } else {
      return res.status(500).json({ error: 'Server unavailable' });
    }
  }
});

module.exports = router;