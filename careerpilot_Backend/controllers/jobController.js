const Job = require("../models/jobModel");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addJob = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(job);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};