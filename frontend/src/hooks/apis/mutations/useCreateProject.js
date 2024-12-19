import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "@/apis/createProjectApi";

export const useCreateProject = () => {
  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: (projectId) => createProjectApi(projectId),
    onSuccess: (data) => {
      console.log("Project created successfully", data);
    },
    onError: (err) => {
      console.error("Error creating project", err);
    },
  });

  return {
    createProjectMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};
