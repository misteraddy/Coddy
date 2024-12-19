export const handleChokidarEvents = (watcher) => {
  watcher.on("all", (event, path) => {
    console.log(`[Chokidar] Event: ${event}, Path: ${path}`);
  });
};
