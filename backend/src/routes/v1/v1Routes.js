import express from "express";
import { createProject, getDirectoryTree } from "../../controllers/projectController.js";

const router = express.Router();


router.post("/project",createProject);

router.get('/projects/:projectId/tree', getDirectoryTree);


export default router ;