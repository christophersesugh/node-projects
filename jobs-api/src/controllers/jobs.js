import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../middleware/async-wrapper.js";
import CustomErrorApi from "../errors/custom-api.js";
import Job from "../models/job.js";

export const getAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

export const getJob = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new CustomErrorApi(`No job with the id ${id}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job });
});

export const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
});

export const updateJob = asyncWrapper(async (req, res) => {
  const {
    body: { company, position },
    user,
    params: { id },
  } = req;
  if (!company || !position) {
    throw new CustomErrorApi(
      `Company and position must be provided`,
      StatusCodes.BAD_REQUEST
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new CustomErrorApi(`No job with the id ${id}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job });
});

export const deleteJob = asyncWrapper(async (req, res) => {
  const {
    user,
    params: { id },
  } = req;

  // Find the job by id and createdBy (associated user)
  const job = await Job.findOneAndRemove({ _id: id, createdBy: user.id });

  if (!job) {
    throw new CustomErrorApi(
      `No job with the id ${id} or job does not belong to the user`,
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).send("Deleted successfully");
});
