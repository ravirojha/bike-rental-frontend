import {ToastContainer} from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
    return <ToastContainer position="bottom-right" autoClose={3000}/>;
};

export default Toast;
