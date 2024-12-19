import React from "react";
import MySvgIcon from "../../assets/name-logo-favicon.svg";
import MySvgIconDark from "../../assets/name-logo-white.svg";
import { useTheme } from "@/components/atoms/DarkMode/ThemeProvider";
import { ModeToggle } from "@/components/atoms/DarkMode/ModeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaReact } from "react-icons/fa";
import { SiQwik, SiVuedotjs, SiSvelte } from "react-icons/si";
import { LoaderCircle } from "lucide-react";

export function CreateProject({
  projectOptions,
  loadingProjectId,
  handleCreateProject,
}) {
  const { theme } = useTheme();

  const icons = {
    react: FaReact,
    svelte: SiSvelte,
    vue: SiVuedotjs,
    qwik: SiQwik,
  };

  return (
    <header className="bg-gray-900 h-[100vh] pattern">
      <div className="container px-6 mx-auto">
        <nav className="flex justify-between py-6 items-center">
          <a href="#">
            <img
              className="h-10"
              src={theme === "dark" ? MySvgIconDark : MySvgIcon}
              alt="logo"
            />
          </a>
          <ModeToggle />
        </nav>

        <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-100 lg:text-4xl">
              Coddy
            </h2>
            <h3 className="mt-2 text-2xl font-semibold text-gray-100">
              By{" "}
              <span className="text-blue-400 dark:text-gray-400">Aditya</span>
            </h3>
            <p className="mt-4 text-gray-100">
              A web-based IDE enabling seamless project compilation and
              execution, with optimized APIs and Dockerized deployment for
              enhanced speed and scalability.
            </p>
          </div>

          <div className="sm:flex sm:flex-wrap xs:grid xs:grid-cols-2 sm:justify-center lg:w-1/2 lg:justify-end mt-8 lg:mt-0">
            {projectOptions.map(({ id, name }) => {
              const Icon = icons[id];
              return (
                <div key={id} className="sm:w-64 xs:m-2 shadow-lg sm:m-4">
                  <Card>
                    <CardContent className="sm:p-5 flex flex-col items-center justify-center xs:m-2 xs:p-3">
                      <Icon size={32} className="text-blue-500" />
                      <p className="mt-2">{name}</p>
                      <Button
                        onClick={() => handleCreateProject(id)}
                        disabled={loadingProjectId === id}
                        className="mt-2"
                      >
                        {loadingProjectId === id ? (
                          <LoaderCircle className="animate-spin" size={16} />
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
