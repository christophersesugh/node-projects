import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobs.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", auth, createJob);
router.get("/:id", getJob);
router.patch("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

export default router;
