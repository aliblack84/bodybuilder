import axios from 'axios'
import { getUrl } from './universal'

export const getAdminStaff = async () => {
    try {
        return await axios.post(getUrl('/admin/logs'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}