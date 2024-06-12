import { axiosInstance } from '../api'
import { apiRoutes } from '../api/routes'

export const loginUser = async ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  try {
    const response = await axiosInstance.post(`${apiRoutes.USER}/login`, {
        username,
        password
      })
      return response
  } catch (error) {
    throw error
  }
}

export const updateUserSettings = async (data: any) => {
  try {
    const response = await axiosInstance.patch(`${apiRoutes.USER}/`, data)
    return response
  } catch (error) {
    throw error
  }
}