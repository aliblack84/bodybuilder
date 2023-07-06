import axios from "axios"
import { getUrl } from "./universal";

export const getAllCategories = async () => {
    try {
        return await axios.post(getUrl('/movement/category/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getAllMovements = async () => {
    try {
        return await axios.post(getUrl('/movement/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const createCategory = async (name: string) => {
    try {
        return await axios.post(getUrl('/movement/category/create'), {
            name: name,
            iconUrl: ''
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const createMovement = async (name: string, description: string, animationUrl: string, categoryId: string) => {
    try {
        return await axios.post(getUrl('/movement/create'), {
            name, description, animationUrl, categoryId
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const updateMovement = async (id: string, name: string, description: string, categoryId: string, animationUrl: string) => {
    try {
        return await axios.post(getUrl('/movement/update'), {
            movementId: id, name, description, animationUrl, categoryId
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const removeMovement = async (id: string) => {
    try {
        return await axios.post(getUrl('/movement/remove'), {
            movementId: id ?? '',
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}