import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponentContainer from "@/components/molecule/EditorComponent/EditorComponentContainer";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import Sidebar from "@/components/molecule/Sidebar/Sidebar";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "@/stores/editorSocketStore";
import FileFolderDialog from "@/components/molecule/FileFolderDialog/FileFolderDialog";

function Compiler() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const { folderId: projectIdFromUrl } = useParams();
  const { projectId, setProjectId } = useDirectoryTreeStore();
  const { editorSocket, setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);

      const editorSocketConn = io(`http://localhost:8081/editor`, {
        query: {
          projectId: projectIdFromUrl,
        },
      });
      setEditorSocket(editorSocketConn);
    }
  }, [projectIdFromUrl, setProjectId, setEditorSocket]);

  return (
    projectId && (
      <div className="flex h-full min-h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        <main className="flex-grow">
          <EditorComponentContainer />
        </main>
        
        <FileFolderDialog />
      </div>
    )
  );
}

export default Compiler;
