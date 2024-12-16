import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponentContainer from "@/components/molecule/EditorComponent/EditorComponentContainer";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import Sidebar from "@/components/molecule/Sidebar/Sidebar";

function Compiler() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const { folderId: projectIdFromUrl } = useParams();
  const { projectId, setProjectId } = useDirectoryTreeStore();

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);
    }
  }, [projectIdFromUrl, setProjectId]);

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
      </div>
    )
  );
}

export default Compiler;
