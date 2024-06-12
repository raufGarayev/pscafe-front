import { axiosInstance } from "../api";
import { apiRoutes } from "../api/routes";

export const getMenu = async () => {
    try {
        const response = await axiosInstance.get(apiRoutes.MENU)
        return response
    } catch (e) {
        throw e
    }
}

export const createMenuItem = async (data: any) => {
    try {
        const response = await axiosInstance.post(apiRoutes.MENU, data)
        return response
    } catch (e) {
        throw e
    }
}

export const updateMenuItem = async (data: any) => {
    try {
        const response = await axiosInstance.patch(apiRoutes.MENU + `/${data.id}`, data)
        return response
    } catch (e) {
        throw e
    }
}

export const deleteMenuItem = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${apiRoutes.MENU}/${id}`)
        return response
    } catch (e) {
        throw e
    }
}