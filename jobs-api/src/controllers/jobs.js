import asyncWrapper from "../middleware/async-wrapper.js";

export const getAllJobs = asyncWrapper(async (req, res) => {
  res.send("JOBS");
});

export const getJob = asyncWrapper(async (req, res) => {
  res.send("get JOBS");
});

export const createJob = asyncWrapper(async (req, res) => {
  res.send("create JOBS");
});

export const updateJob = asyncWrapper(async (req, res) => {
  res.send("update JOBS");
});

export const deleteJob = asyncWrapper(async (req, res) => {
  res.send("delete JOBS");
});
