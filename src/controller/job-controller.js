const jobModel = require("../models/job-model");

const getAllJobs = async (req, res) => {
  const jobs = await jobModel
    .find({ createdBy: req.user.userId })
    .sort("createdAt");
  return res.status(200).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
  console.log(req.params.id);
  try {
    const job = await jobModel.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!job) {
      return res.status(500).json({ err: `no job with id ${req.params.id}` });
    }
    return res.status(200).json({ job });
  } catch (err) {
    // return res.status(500).json({ error: `no job with id ${req.params.id} ` });
    return res.status(500).json({ err });
  }
};
const createJob = async (req, res) => {
  console.log(req.body);
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);
  return res.status(200).json({ job });
};
const editJob = async (req, res) => {
  try {
    const { position, company } = req.body;
    if (!position || !company)
      return res
        .status(501)
        .json({ err: "Please provide company and position" });

    console.log(position, company);
    const job = await jobModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(500).json({ err: `no job with id ${req.params.id}` });
    }
    return res.status(200).json({ job });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: `no job with id ${req.params.id} ` });
    return res.status(501).json({ err });
  }
};
const deleteJob = async (req, res) => {
  const job = await jobModel.findByIdAndDelete({ _id: req.params.id });
  if (!job) {
    return res.status(500).json({ err: `no job with id ${req.params.id}` });
  }
  return res.status(200).json({ job });
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
};
