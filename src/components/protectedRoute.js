import React, {useContext} from 'react';
import {AuthContext} from "../App";
import {Navigate} from "react-router-dom";
import Auth from "../services/auth";
import {useLocation, useParams} from "react-router";


function ProtectedRoute({element}) {
    const {user, setUser} = useContext(AuthContext);
    const { id } = useParams();
    const location = useLocation();
    const path = location.pathname.split('/')[2];
        if(user?.isManager || (path === "user" && parseInt(id) === parseInt(user?.id))) {
            return element;
        }
        else {
            return <Navigate to={'/not-found'} />
        }

}

export default ProtectedRoute;