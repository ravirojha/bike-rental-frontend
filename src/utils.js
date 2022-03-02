import {toast} from "react-toastify";

export const Util = {
    sleep: (millis) => new Promise((resolve) => setTimeout(resolve, millis))
};

export const URL = `https://bike-rental-7.herokuapp.com`;

export const jwtSecret = 'askd364egrg734te374terg';

export const orangeColor = '#f0dc82';

export const validateSignUpForm = (name, email, password) => {
    if (!name && !email && !password &&
        name.trim().length > 4 &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) &&
        password !== ""
    ) {
        return true;
    } else {
        toast.error("Invalid Credentials");
    }
};

export const validateLoginForm = (email, password) => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) && password !== "") {
        console.log(email, password);
        return true;
    } else {
        toast.error("Invalid Credentials");
    }
};