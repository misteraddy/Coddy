export const chokidarConfig = (projectId) => ({
    ignored: (path) => path.includes("node_modules"),
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
    },
    ignoreInitial: true,
  });
  