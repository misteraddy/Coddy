import React from "react";
import MySvgIcon from "../assets/name-logo-favicon.svg";
import MySvgIconDark from "../assets/name-logo-white.svg";
import { useTheme } from "@/components/atoms/DarkMode/ThemeProvider";
import { ModeToggle } from "@/components/atoms/DarkMode/ModeToggle";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/hooks/apis/mutations/useCreateProject";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { SiQwik } from "react-icons/si";
import { SiVuedotjs } from "react-icons/si";
import { SiSvelte } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const { createProjectMutation, isLoading } = useCreateProject();
  const { theme } = useTheme();

  const navigate = useNavigate();

  const projectOptions = [
    { id: "react", name: "React", Icon: FaReact },
    { id: "svelte", name: "Svelte", Icon: SiSvelte },
    { id: "vue", name: "Vue", Icon: SiVuedotjs },
    { id: "qwik", name: "Qwik", Icon: SiQwik },
  ];

  async function handleCreateProject(projectId) {
    console.log(`Going to trigger the API for ${projectId}`);
    try {
      const {data} = await createProjectMutation(projectId);
      console.log(`Now we should redirect to the editor for ${data?.projectId}`);
      navigate(`/project/${data?.projectId}`);
    } catch (error) {
      console.log(`Error creating project for ${projectId}`, error);
      navigate(`/project/notfound`);
    }
  }

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
            {projectOptions.map(({ id, name, Icon }) => (
              <div key={id} className="sm:w-64 xs:m-2 shadow-lg sm:m-4">
                <Card>
                  <CardContent className="sm:p-5 flex flex-col items-center justify-center xs:m-2 xs:p-3">
                    {isLoading ? (
                      <Loader2 className="animate-spin mr-2" size={18} />
                    ) : (
                      <Icon size={24} />
                    )}
                    <p className="mt-2">{name}</p>
                    <Button
                      onClick={() => handleCreateProject(id)}
                      disabled={isLoading}
                      className="mt-2"
                    >
                      {isLoading ? "Loading..." : `Create`}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default CreateProject;
