const express = require("express");
const router = express.Router();

const {
  getJobs,
  addJob,
  deleteJob,
  updateJobStatus,
} = require("../controllers/jobController");

router.get("/:userId", getJobs);
router.post("/", addJob);
router.delete("/:id", deleteJob);
router.put("/:id", updateJobStatus);

module.exports = router;