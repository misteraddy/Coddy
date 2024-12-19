import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MySvgIcon from "../../assets/name-logo-favicon.svg";
import MySvgIconDark from "../../assets/name-logo-white.svg";
import { useTheme } from "../atoms/DarkMode/ThemeProvider";
import { ModeToggle } from "../atoms/DarkMode/ModeToggle";

function Header() {
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    console.log(path);
  })

  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-black p-4 border z-50">
      <img
        className="w-auto h-6 xs:h-10 sm:h-10"
        src={theme.theme === "dark" ? MySvgIconDark : MySvgIcon}
        alt="logo"
      />

      <ModeToggle />
    </div>
  );
}

export default Header;
