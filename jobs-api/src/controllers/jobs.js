import { StatusCodes } from "http-status-codes";
import { prisma } from "../libs/prisma.js";
import asyncWrapper from "../middleware/async-wrapper.js";
import CustomErrorApi from "../errors/custom-api.js";

// export const getAllJobs = asyncWrapper(async (req, res) => {
//   const jobs = await Job.find({}).sort("createdAt");
//   res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
// });
export const getAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "asc" } });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

// export const getJob = asyncWrapper(async (req, res) => {
//   const { id } = req.params;
//   const job = await Job.findOne({ _id: id });
//   if (!job) {
//     throw new CustomErrorApi(`No job with the id ${id}`, StatusCodes.NOT_FOUND);
//   }
//   res.status(StatusCodes.OK).json({ job });
// });

export const getJob = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    throw new CustomErrorApi(`No job with the id ${id}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job });
});

// export const createJob = asyncWrapper(async (req, res) => {
//   req.body.createdBy = req.user.id;
//   const job = await Job.create(req.body);
//   res.status(StatusCodes.CREATED).json({ job });
// });

export const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.id;
  const { company, position } = req.body;
  const createdByUserId = req.user.id;
  const job = await prisma.job.create({
    data: {
      company,
      position,
      createdBy: {
        connect: { id: createdByUserId },
      },
    },
  });
  res.status(StatusCodes.CREATED).json({ job });
});

// export const updateJob = asyncWrapper(async (req, res) => {
//   const {
//     body: { company, position },
//     user,
//     params: { id },
//   } = req;
//   if (!company || !position) {
//     throw new CustomErrorApi(
//       `Company and position must be provided`,
//       StatusCodes.BAD_REQUEST
//     );
//   }

//   const job = await Job.findOneAndUpdate(
//     { _id: id, createdBy: user.id },
//     req.body,
//     { new: true, runValidators: true }
//   );
//   if (!job) {
//     throw new CustomErrorApi(`No job with the id ${id}`, StatusCodes.NOT_FOUND);
//   }
//   res.status(StatusCodes.OK).json({ job });
// });

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

  // Find the job by id and createdBy (associated user)
  const job = await prisma.job.findFirst({
    where: {
      id,
      createdBy: {
        equals: user.id,
      },
    },
  });

  if (!job) {
    throw new CustomErrorApi(
      `Job with the id ${id} does not exist or does not belong to the user`,
      StatusCodes.NOT_FOUND
    );
  }

  // Update the job with the provided data
  const updatedJob = await prisma.job.update({
    where: { id, createdById: user.id },
    data: { company, position },
  });

  res.status(StatusCodes.OK).json({ job: updatedJob });
});

export const deleteJob = asyncWrapper(async (req, res) => {
  const {
    user,
    params: { id },
  } = req;

  // Find the job by id and createdBy (associated user)
  const job = await prisma.job.findFirst({
    where: { id, createdBy: user.id },
  });

  if (!job) {
    throw new CustomErrorApi(
      `No job with the id ${id} or job does not belong to the user`,
      StatusCodes.NOT_FOUND
    );
  }

  // Delete the job
  await prisma.job.delete({ where: { id } });

  res.status(StatusCodes.OK).send("Deleted successfully");
});
