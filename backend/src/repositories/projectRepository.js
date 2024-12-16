import util from "util";
import child_process from "child_process";
import fs from "fs/promises";

const execPromisified = util.promisify(child_process.exec);

export const createProjectDirectory = async (projectId) => {
  const directoryPath = `./projects/${projectId}`;
  console.log(`Creating directory: ${directoryPath}`);
  await fs.mkdir(directoryPath);
};

export const executeCommand = async (command, cwd) => {
  console.log(`Running command in directory: ${cwd}`);
  await execPromisified(command, { cwd });
};
