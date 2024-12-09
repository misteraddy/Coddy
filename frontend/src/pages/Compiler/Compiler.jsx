import React, { useState } from "react";
import EditorComponentContainer from "@/components/molecule/EditorComponent/EditorComponentContainer";
import { Button } from "@/components/ui/button";
import { FaHome, FaInbox, FaCalendarAlt, FaSearch, FaCog } from "react-icons/fa"; // Import icons from react-icons


function Compiler() {
  const [activeTab, setActiveTab] = useState("Home"); // State to track the active tab

  const menuItems = [
    {
      title: "Home",
      value: "home",
      icon: FaHome,
    },
    {
      title: "Inbox",
      value: "inbox",
      icon: FaInbox,
    },
    {
      title: "Calendar",
      value: "calendar",
      icon: FaCalendarAlt,
    },
    {
      title: "Search",
      value: "search",
      icon: FaSearch,
    },
    {
      title: "Settings",
      value: "settings",
      icon: FaCog,
    },
  ];

  const handleLogout = () => {
    // Define logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-64 shadow-md hidden md:block border-r-2 dark:bg-[#262626] border-gray-400 dark:border-white">
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Instructor</h2>
          </div>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Button
              className="w-full justify-start mb-2"
              key={item.value}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={() =>
                item.value === "logout" ? handleLogout() : setActiveTab(item.value)
              }
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow">
        <EditorComponentContainer />
      </main>
    </div>
  );
}

export default Compiler;
