
export const handleTerminalSocketEvents = (socket, terminalNamespace) => {
  socket.on("shell-input", (data) => {
    console.log("input received", data);
    terminalNamespace.emit("shell-output", data);
  });

  socket.on("disconnect", () => {
    console.log("terminal disconnected");
  });
};
