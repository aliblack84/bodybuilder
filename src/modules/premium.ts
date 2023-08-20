import axios from 'axios'
import { getUrl } from './universal'
export const getNotVerified = async () => {
    try {
        return await axios.post(getUrl('/premium/not-verified'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const acceptVerification = async (reqId: string) => {
    try {
        return await axios.post(getUrl('/premium/accept'), {
            reqId
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const rejectVerification = async (reqId: string) => {
    try {
        return await axios.post(getUrl('/premium/reject'), {
            reqId
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getRejected = async () => {
    try {
        return await axios.post(getUrl('/premium/reject/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getAllAccepted = async () => {
    try {
        return await axios.post(getUrl('/premium/accept/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const premiumUser = async (id: string) => {
    try {
        return await axios.post(getUrl('/user/premium'), {userId: id}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const unPremiumUser = async (id: string) => {
    try {
        return await axios.post(getUrl('/user/un-premium'), {userId: id}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const blockUser = async (id: string) => {
    try {
        return await axios.post(getUrl('/user/block'), {userId: id}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const unBlockUser = async (id: string) => {
    try {
        return await axios.post(getUrl('/user/un-block'), {userId: id}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}