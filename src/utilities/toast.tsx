import { toast } from "react-toastify";

export const successToast = (message: string) => {
  toast.success(message);
};

export const warningToast = (message: string) => {
  toast.warn(message, { toastId: 1 });
};

export const infoToast = (message: string) => {
  toast.info(message, { toastId: 2 });
};

export const errorToast = (message: string) => {
  toast.error(message, { toastId: 1 });
};

export const dismissToast = (id: number) => {
  toast.dismiss(id);
};
