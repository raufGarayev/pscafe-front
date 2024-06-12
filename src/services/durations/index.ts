import { axiosInstance } from "../api";
import { apiRoutes } from "../api/routes";

export const getDurations = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.DURATIONS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDuration = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.DURATIONS, {
        ...data,
        seconds: data.minutes * 60
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDuration = async (data: any) => {
  try {
    const response = await axiosInstance.patch(apiRoutes.DURATIONS + `/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDuration = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${apiRoutes.DURATIONS}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};