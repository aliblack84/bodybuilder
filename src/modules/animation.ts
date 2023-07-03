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