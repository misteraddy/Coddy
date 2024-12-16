import { FileIcon } from "@/components/atoms/FileIcon/FileIcon";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function Tree({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  const toggleVisibility = (path) => {
    setVisibility((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleExtractingExtension = (name) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  return (
    <div className="pl-1 w-full">
      {fileFolderData?.children ? (
        <div className="flex items-center w-full">
          <Button
            onClick={() => toggleVisibility(fileFolderData.path)}
            variant="ghost"
            className="flex items-center space-x-1 p-1 text-sm font-medium text-left rounded"
          >
            {visibility[fileFolderData.path] ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
            <span>{fileFolderData.name}</span>
          </Button>
        </div>
      ) : (
        <div className="flex">
          <FileIcon extension={handleExtractingExtension(fileFolderData.name)} />
          <p className="text-sm text-gray-700 dark:text-gray-300">{fileFolderData.name}</p>
        </div>
      )}

      {visibility[fileFolderData.path] && fileFolderData?.children && (
        <div className="pl-4 mt-2">
          {fileFolderData.children.map((child) => (
            <Tree key={child.path} fileFolderData={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tree;
