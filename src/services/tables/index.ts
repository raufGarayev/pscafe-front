import { axiosInstance } from '../api'
import { apiRoutes } from '../api/routes'

export const getTables = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.TABLES)
    return response.data
  } catch (error) {
    throw error
  }
}

export const startTable = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.TABLES + '/run', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const stopTable = async (id: number, data?: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.TABLES + '/stop/' + id, data)
    return response
  } catch (error) {
    throw error
  }
}

export const getRunningTables = async () => {
  try {
    const response = await axiosInstance.get(apiRoutes.TABLES + '/run')
    return response.data
  } catch (error) {
    throw error
  }
}

export const transferTable = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.TABLES + '/transfer', data)
    return response
  } catch (error) {
    throw error
  }
}

export const updateRunningTable = async (data: any) => {
  try {
    const response = await axiosInstance.patch(apiRoutes.TABLES + `/${data.id}`, data)
    return response
  } catch (error) {
    throw error
  }
}

export const addMenuToTable = async (data: any) => {
  try {
    const response = await axiosInstance.post(apiRoutes.TABLES + '/menu', data)
    return response
  } catch (error) {
    throw error
  }
}