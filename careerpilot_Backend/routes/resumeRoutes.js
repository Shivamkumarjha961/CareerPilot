const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Resume = require('../models/resumeModel');

const router = express.Router();


// ================= MULTER STORAGE =================
const storage = multer.memoryStorage();
const upload = multer({ storage });


// ================= UPLOAD RESUME =================
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
      });
    }

    const dataBuffer = req.file.buffer;

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
      // Create a virtual filePath to keep database schema compatibility
      const virtualPath = `uploads/${Date.now()}-${req.file.originalname}`;
      savedResume = await Resume.create({
        userId: req.body.userId,
        fileName: req.file.originalname,
        filePath: virtualPath,
        fileData: dataBuffer,
        contentType: req.file.mimetype,
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


// ================= GET RESUME FILE BINARY =================
router.get('/file/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        error: 'Resume not found',
      });
    }

    if (resume.fileData) {
      res.setHeader('Content-Type', resume.contentType || 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${resume.fileName || 'resume.pdf'}"`);
      return res.send(resume.fileData);
    }

    // Fallback to local files if buffer is not available (for older legacy uploads)
    if (resume.filePath && fs.existsSync(resume.filePath)) {
      const fileStream = fs.createReadStream(resume.filePath);
      res.setHeader('Content-Type', resume.contentType || 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${resume.fileName || 'resume.pdf'}"`);
      return fileStream.pipe(res);
    }

    res.status(404).json({
      error: 'Resume file data not found',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to retrieve resume file',
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
