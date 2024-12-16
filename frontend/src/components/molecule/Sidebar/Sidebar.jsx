import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDirectoryTreeStore } from "@/stores/treeStructureStore";
import Tree from "../Tree/Tree";

function Sidebar({ activeTab, setActiveTab, handleLogout }) {
  const { treeStructure, setTreeStructure } = useDirectoryTreeStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("Tree structure:", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [treeStructure, setTreeStructure]);

  return (
    <aside className="w-64 shadow-md hidden md:block border-r-2 dark:bg-[#262626] border-gray-400 dark:border-white">
      <div className="p-4 border">
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold mb-4">User ABC</h2>
          <Button>Logout</Button>
        </div>
      </div>
      <nav>
        {treeStructure && (<Tree fileFolderData={treeStructure}/>)}
      </nav>
    </aside>
  );
}

export default Sidebar;
