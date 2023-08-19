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

export const getUsers = async () => {
    try {
        return await axios.post(getUrl('/user/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getMonthlyStatus = async (year: number) => {
    try {
        return await axios.post(getUrl('/user/monthly-status'), {
            year
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getOnlineUsers = async () => {
    try {
        return await axios.post(getUrl('/user/online'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getLogs = async () => {
    try {
        return await axios.post(getUrl('/user/logs'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getCountryData = async (year) => {
    try {
        return await axios.post(getUrl('/user/country/data'), {year}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getAgeData = async () => {
    try {
        return await axios.post(getUrl('/user/age'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getMonthlyAgeStatus = async (year: number) => {
    try {
        return await axios.post(getUrl('/user/age/monthly-status'), { year }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
} 