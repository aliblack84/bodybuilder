import axios from "axios";
import { getUrl } from "./universal";

export const getUsersData = async () => {
    try {
        return await axios.post(getUrl('/user/data'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}