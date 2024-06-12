import { axiosInstance } from "../api";
import { apiRoutes } from "../api/routes";

export const getTariffs = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.TARIFFS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTariff = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.TARIFFS, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTariff = async (data: any) => {
  try {
    const response = await axiosInstance.patch(apiRoutes.TARIFFS + `/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTariff = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${apiRoutes.TARIFFS}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};