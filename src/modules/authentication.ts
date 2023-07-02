import axios from 'axios'
import {getUrl} from './universal'
export const login = async (username: string, password: string) => {
    try {
        const result = await axios.post(getUrl('/auth/login'), {
            username, password
        })
        
        return result;
    } catch (error) {
        return error.response;
    }
}

export const testAuth = async () => {
    try {
        return await axios.post(getUrl('/auth/test'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}