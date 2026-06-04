const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Resume = require('../models/resumeModel');

const router = express.Router();


// ================= MULTER STORAGE =================
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// ================= UPLOAD RESUME =================
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    let extractedText = '';

    try {
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } catch {
      extractedText = 'Resume uploaded successfully';
    }

    let score = 70;

    if (extractedText.includes('React')) score += 5;
    if (extractedText.includes('Node')) score += 5;
    if (extractedText.includes('JavaScript')) score += 5;
    if (extractedText.includes('MongoDB')) score += 5;
    if (extractedText.includes('SQL')) score += 5;
    if (extractedText.includes('Python')) score += 5;

    if (score > 100) score = 100;

    let savedResume = null;

    if (req.body.userId && req.body.userId.length === 24) {
      savedResume = await Resume.create({
        userId: req.body.userId,
        fileName: req.file.originalname,
        filePath: req.file.path,
        atsScore: score,
        extractedText,
      });
    }

    res.json({
      atsScore: score,
      extractedText,
      savedResume,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Resume parsing failed',
    });
  }
});


// ================= GET USER RESUMES =================
router.get('/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(resumes);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch resume history',
    });
  }
});


// ================= DELETE RESUME =================
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        error: 'Resume not found',
      });
    }

    if (resume.filePath && fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Resume deleted successfully',
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Delete failed',
    });
  }
});

module.exports = router;
