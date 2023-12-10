import { toast } from 'react-toastify'

// This file is used to create toast notifications

export const successToast = (message) => {
    toast.success(message)
}

export const warningToast = (message) => {
    toast.warn(message, { toastId: 1 })
}

export const infoToast = (message) => {
    toast.info(message, { toastId: 2 })
}

export const errorToast = (message) => {
    toast.error(message, { toastId: 1 })
}

export const dismissToast = (id) => {
    toast.dismiss(id)
}
