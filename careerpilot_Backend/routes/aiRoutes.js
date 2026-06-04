const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/suggestions', async (req, res) => {
  try {
    const resumeText = req.body.resumeText || "No resume uploaded";
    const githubData = req.body.githubData || {};

    const prompt = `
Give exactly 6 short career suggestions.

Resume:
${resumeText}

GitHub:
Repos: ${githubData.repos || 0}
Followers: ${githubData.followers || 0}
Following: ${githubData.following || 0}

Rules:
- Max 6 bullets
- Each bullet max 6 words
- Short ATS suggestions
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    const githubLevel =
      githubData.repos > 5
        ? "Strong Developer"
        : githubData.repos > 2
        ? "Intermediate Developer"
        : "Beginner Developer";

    res.json({
      suggestions: aiText,
      githubLevel
    });

  } catch (error) {
    console.log("AI ERROR:", error.response?.data || error.message);

    res.json({
      suggestions: `
• Add technical keywords
• Improve project descriptions
• Add deployment links
• Maintain GitHub activity
• Add certifications
• Improve ATS structure
      `,
      githubLevel: "Beginner Developer"
    });
  }
});

module.exports = router;