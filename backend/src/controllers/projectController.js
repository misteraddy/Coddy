import util from "util";
import child_process from "child_process";
import fs from "fs/promises";
import  uuid4  from "uuid4";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const execPromisified = util.promisify(child_process.exec);

export const createProject = async (req, res) => {
  const uniqueId = uuid4();

  try {
    
    const projectId = uuid4();
    console.log("New project id is", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    // Run the Vite project creation command
    const response = await execPromisified(
      "npm create vite@latest sandbox -- --template react",
      { cwd: `./projects/${projectId}` }
    );

    return successResponse(res, uniqueId, "Project created successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to create project");
  }
};
