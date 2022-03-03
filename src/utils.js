import {toast} from "react-toastify";

export const Util = {
    sleep: (millis) => new Promise((resolve) => setTimeout(resolve, millis))
};

export const URL = `https://bike-rental-7.herokuapp.com`;

export const jwtSecret = 'askd364egrg734te374terg';

export const orangeColor = '#f0dc82';

export const validateSignUpForm = (name, email, password) => {
    if (name === "" || name.trim().length < 1) {
        toast.error("Name cannot be empty")
    } else if (email === "") {
        toast.error("Email cannot be empty")
    } else if (password === "") {
        toast.error("Password cannot be empty")
    } else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
        toast.error("Enter a valid email address")
    } else {
        return true;
    }
};


export const validateLoginForm = (email, password) => {
    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
        toast.error("Enter a valid email address");
    } else if (password === "") {
        toast.error("Password cannot be empty");
    } else {
        return true;
    }
};