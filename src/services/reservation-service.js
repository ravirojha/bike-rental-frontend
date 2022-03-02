import axios from "axios";
import {URL} from '../utils'


export default class ReservationService {
    static fetchReservations = async ({page = 1}, { jwt }) => {
        return await axios.get(`${URL}/reservations`,{
            headers: {
                jwt
            },
            params: {
                page
            }
        })
    }

    static getResByBikeId = async(id, {page = 1}, { jwt }) => {
        return await axios.get(`${URL}/reservations/bikes/${id}`, {
            headers: {
                jwt
            },
            params: {
                page
            }
        })
    }

    static getResByUserId = async(id, {page = 1}, { jwt }) => {
        return await axios.get(`${URL}/reservations/users/${id}`, {
            headers: {
                jwt
            },
            params: {
                page
            }
        })
    }

    static addReservation = async({userId, bikeId, startDate, endDate}, { jwt }) => {
        return await axios.post(`${URL}/reservations`, {
            userId,
            bikeId,
            startDate,
            endDate
        }, {
            headers: {
                jwt
            }
        })
    }

    static cancelReservation = async(id, {userId, bikeId, startDate, endDate}, { jwt }) => {
        return await axios.put(`${URL}/reservations/${id}`, {
            userId,
            bikeId,
            startDate,
            endDate
        },{
            headers: {
                jwt
            }
        })
    }

    static getRating = async({userId, bikeId, resId}, { jwt }) => {
        return await axios.get(`${URL}/ratings`, {
            headers: {
                jwt
            },
            params: {
                userId,
                bikeId,
                resId
            }
        })
    }

    static addRating = async({resId, userId, bikeId, rating}, {jwt}) => {
        return await axios.post(`${URL}/ratings`, {
            resId,
            userId,
            bikeId,
            rating
        }, {
            headers: {
                jwt
            }
        })
    }


}
