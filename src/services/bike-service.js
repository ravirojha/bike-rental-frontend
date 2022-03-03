import axios from "axios";
import * as moment from 'moment';
import {URL} from '../utils'


export default class BikeService {
    static fetchBikes = async ({page = 1, startDate, endDate, model, color, location, rating}, { jwt }) => {
        const filter = {};
        filter.page = page;
        if(startDate && endDate) {
            filter.startDate = moment(startDate).format('YYYY-MM-DD');
            filter.endDate = moment(endDate).format('YYYY-MM-DD');
        }
        if(model) filter.model = model;
        if(color) filter.color = color;
        if(location) filter.location = location;
        if(rating) filter.rating = rating;
         return await axios.get(`${URL}/bikes`, {
            headers: {
                jwt
            },
            params: {
                ...filter
            }
        })
    };

    static addBike = async ({model, color, location, isAvailable}, { jwt }) => {
        return await axios.post(`${URL}/bikes`,{
            model,
            color,
            location,
            isAvailable
        }, {
            headers: {
                jwt
            }
        })
    };

    static updateBike = async (id,{model, color, location, isAvailable}, { jwt }) => {
        return await axios.put(`${URL}/bikes/${id}`, {
            model,
            color,
            location,
            isAvailable
        }, {
            headers: {
                jwt
            }
        })
    };

    static deleteBike = async (id, { jwt }) => {
        return await axios.delete(`${URL}/bikes/${id}`, {
            headers: {
                jwt
            }
        })
    };
}
