import React, { useState } from "react";
import { useCreateProject } from "@/hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";
import { CreateProject } from "./CreateProject";

export function CreateProjectContainer() {
  const { createProjectMutation } = useCreateProject();
  const navigate = useNavigate();

  const [loadingProjectId, setLoadingProjectId] = useState(null);

  const projectOptions = [
    { id: "react", name: "React" },
    { id: "svelte", name: "Svelte" },
    { id: "vue", name: "Vue" },
    { id: "qwik", name: "Qwik" },
  ];

  async function handleCreateProject(projectId) {
    setLoadingProjectId(projectId);
    try {
      const { data } = await createProjectMutation(projectId);
      navigate(`/project/${data?.projectId}`);
    } catch (error) {
      console.log(`Error creating project for ${projectId}`, error);
      navigate(`/project/notfound`);
    } finally {
      setLoadingProjectId(null);
    }
  }

  return (
    <CreateProject
      projectOptions={projectOptions}
      loadingProjectId={loadingProjectId}
      handleCreateProject={handleCreateProject}
    />
  );
}
