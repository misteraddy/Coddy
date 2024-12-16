import {
  createProjectDirectory,
  executeCommand,
} from "../repositories/projectRepository.js";
import uuid4 from "uuid4";
import dirTree from "directory-tree";
import path from "path";

export const createNewProject = async (tech) => {
  const validTechnologies = ["react", "svelte", "vue", "qwik"];
  if (!validTechnologies.includes(tech)) {
    throw new Error("Invalid project type specified");
  }

  const projectId = uuid4();
  console.log("Generated Project ID:", projectId);

  await createProjectDirectory(projectId);

  const commands = {
    react: "npm create vite@latest sandbox -- --template react",
    svelte: "npm create vite@latest sandbox -- --template svelte",
    vue: "npm create vite@latest sandbox -- --template vue",
    qwik: "npm create vite@latest sandbox -- --template qwik",
  };

  const command = commands[tech];
  console.log(`Executing command: ${command}`);

  await executeCommand(command, `./projects/${projectId}`);

  return projectId;
};

export const getProjectTreeService = async (projectId) => {
  const projectPath = path.resolve(`./projects/${projectId}`);
  const tree = dirTree(projectPath);

  return tree;
};
