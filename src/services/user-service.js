import axios from "axios";
import {URL} from '../utils'


export default class UserService {
    static getUsers = async ({page = 1}, { jwt }) => {
        return await axios.get(`${URL}/users`,
            {
                headers: {
                    jwt
                },
                params: {
                    page
                }
            });

    };

    static addUser = async ({name, email, password, isManager}, { jwt }) => {
        return await axios.post(`${URL}/users`, {
            name,
            email,
            password,
            isManager
        }, {
                headers: {
                    jwt
                }
            })
    };

    static updateUser = async (id, {name, email, password, isManager}, { jwt }) => {
        return await axios.put(`${URL}/users/${id}`, {
            name,
            email,
            password,
            isManager
        }, {
            headers: {
                jwt
            }
        })
    };

    static deleteUser = async (id, { jwt }) => {
        return await axios.delete(`${URL}/users/${id}`, {
            headers: {
                jwt
            }
        })
    };
};

