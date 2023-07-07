import axios from 'axios';
import { getUrl } from './universal';

export const getAllTickets = async () => {
    try {
        return await axios.post(getUrl('/ticket/all'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const getNotResponded = async () => {
    try {
        return await axios.post(getUrl('/ticket/not-responded'), {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}

export const respondTicket = async (ticketId: string, subject: string, message: string) => {
    try {
        return await axios.post(getUrl('/ticket/respond'), {
            ticketId, subject, message
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
    } catch (error) {
        return error.response;
    }
}