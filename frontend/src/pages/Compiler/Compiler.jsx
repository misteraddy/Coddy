import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponentContainer from "@/components/molecule/EditorComponent/EditorComponentContainer";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import Sidebar from "@/components/molecule/Sidebar/Sidebar";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "@/stores/editorSocketStore";
import FileFolderDialog from "@/components/molecule/FileFolderDialog/FileFolderDialog";
import { BrowserTerminal } from "@/components/molecule/BrowserTerminal/BrowserTerminal";
import { useTerminalSocketStore } from "../../stores/terminalSocketStore";

function Compiler() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const { folderId: projectIdFromUrl } = useParams();
  const { projectId, setProjectId } = useDirectoryTreeStore();
  const { editorSocket, setEditorSocket } = useEditorSocketStore();
  const { terminalSocket, setTerminalSocket } = useTerminalSocketStore();

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);

      const editorSocketConn = io(`http://localhost:8081/editor`, {
        query: {
          projectId: projectIdFromUrl,
        },
      });

      try {
        const ws = new WebSocket(
          "ws://localhost:4000/terminal?projectId=" + projectIdFromUrl
        );
        console.log(ws);
        setTerminalSocket(ws);
      } catch (error) {
        console.log("error in ws", error);
      }

      setEditorSocket(editorSocketConn);
    }
  }, [projectIdFromUrl, setProjectId, setEditorSocket,setTerminalSocket]);

  return (
    projectId && (
      <div className="flex h-[89vh]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        <main className="flex-grow flex flex-col">
          <div className="h-[70%] overflow-y-scroll">
            <EditorComponentContainer />
          </div>
          <div className="h-[25%] max-w-full overflow-x-auto">
            {terminalSocket && <BrowserTerminal />}
          </div>
          <div className="bg-gray-100 max-w-full overflow-x-auto flex justify-end mt-2"></div>
        </main>
        <FileFolderDialog />
      </div>
    )
  );
}

export default Compiler;
