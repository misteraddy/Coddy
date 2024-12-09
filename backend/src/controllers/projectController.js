import util from "util";
import child_process from "child_process";
import fs from "fs/promises";
import uuid4 from "uuid4";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const execPromisified = util.promisify(child_process.exec);

export const createProject = async (req, res) => {
  const tech = req.body.projectType; 

  console.log("Requested technology:", tech);

  try {

    const projectId = uuid4();
    console.log("Generated Project ID:", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    let command;
    switch (tech) {
      case "react":
        command = "npm create vite@latest sandbox -- --template react";
        break;

      case "svelte":
        command = "npm create vite@latest sandbox -- --template svelte";
        break;

      case "vue":
        command = "npm create vite@latest sandbox -- --template vue";
        break;

      case "qwik":
        command = "npm create vite@latest sandbox -- --template qwik";
        break;

      default:
        return errorResponse(res, "Invalid project type specified");
    }

    console.log(`Executing command: ${command}`);

    await execPromisified(command, { cwd: `./projects/${projectId}` });

    return successResponse(res, { projectId }, "Project created successfully");
  } catch (error) {
    console.error("Error during project creation:", error);
    return errorResponse(res, "Failed to create project");
  }
};
