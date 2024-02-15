const express = require("express");

const router = express.Router();
const {
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
} = require("../controller/job-controller");
router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(editJob).delete(deleteJob);

module.exports = router;
