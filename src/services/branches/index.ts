import { axiosInstance } from "../api";
import { apiRoutes } from "../api/routes";

export const getBranches = async () => {
    try {
        const response = await axiosInstance.get(apiRoutes.BRANCHES)
        return response
    } catch (e) {
        throw e
    }
}

export const updateBranch = async (branchId: string, data: any) => {
    try {
        const response = await axiosInstance.patch(`${apiRoutes.BRANCHES}/${branchId}`, data)
        return response
    } catch (e) {
        throw e
    }
}