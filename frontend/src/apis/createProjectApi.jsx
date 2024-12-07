import axiosInstance from "@/config/axiosConfig";

export const createProjectApi = async () => {
    try {
        console.log("Hi");
        const response = await axiosInstance.post('/api/v1/project');
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}