// Controller: projectController.js
import {
  createNewProject,
  getProjectTreeService,
} from "../services/projectService.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const createProject = async (req, res) => {
  const tech = req.body.projectType;

  try {
    const projectId = await createNewProject(tech);
    return successResponse(res, { projectId }, "Project created successfully");
  } catch (error) {
    console.error("Error during project creation:", error);
    return errorResponse(res, "Failed to create project");
  }
};

export const getDirectoryTree = async (req, res) => {
  try {
    const tree = await getProjectTreeService(req.params.projectId);

    return successResponse(res, tree, "Successfully fetched the tree");
  } catch (error) {
    console.error("Error in fetching the tree:", error);
    return errorResponse(res, "Failed to fetch the tree");
  }
};
