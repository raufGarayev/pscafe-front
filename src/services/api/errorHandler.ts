import { toast } from "react-toastify";

export const errorHandler = (error: any) => {
  if (error.response) {
    if (Array.isArray(error.response.data.message)) {
      error.response.data.message.forEach((item: any) => {
        toast.error(startErrorWithUpperCase(item))
      });
    } else {
      toast.error(startErrorWithUpperCase(error.response.data.message))
    }
  }
};
const startErrorWithUpperCase = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
