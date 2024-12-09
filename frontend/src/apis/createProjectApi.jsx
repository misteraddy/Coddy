import axiosInstance from "@/config/axiosConfig";

export const createProjectApi = async (projectType) => {
  try {
    const response = await axiosInstance.post('/api/v1/project', { projectType });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
