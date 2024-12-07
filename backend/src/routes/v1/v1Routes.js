import express from "express";
import { createProject } from "../../controllers/projectController.js";

const router = express.Router();


router.post("/project",createProject);


export default router ;