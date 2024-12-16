import axiosInstance from "@/config/axiosConfig";

export const createProjectApi = async (projectType) => {
  try {
    const response = await axiosInstance.post("/api/v1/project", {
      projectType,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDirectoryTree = async ({ projectId }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/projects/${projectId}/tree`);
    console.log(response.data);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
