import React, {useContext, useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

import UserService from "../services/user-service";
import UserDetails from "../components/userDetails";
import AddItem from "../components/addItem";
import {toast} from "react-toastify";
import {AuthContext} from "../App";


function Users() {
    const [users, setUsers] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [bit, setBit] = useState(true);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);

    function changeUser(param, val) {
        if (param === 'user') {
            setUsers(val);
        } else if (param === 'new') {
            setIsNew(val);
        } else if (param === 'reload') {
            console.log('change called');
            setBit(prev => !prev);
        }
    }

    useEffect(() => {
        setLoading(true);
        UserService.getUsers({page}, user).then((res => {
            setUsers(res?.data.users);
            setPageCount(res?.data.pageCount);
            if (page > res?.data.pageCount){

                setPage(res?.data.pageCount);
            }
            setLoading(false);
        })).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }, [page, bit]);



    return (
        <Container sx={{width: "60vw", marginTop: "6.5%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <AddItem item={"user"} isNew={isNew} change={changeUser}/>
            {isNew && <UserDetails userItem={{name: '', email: '', isManager: false}} changeUser={changeUser} isNew={isNew}/>}
            {!loading ? users?.map((user) => (<UserDetails key={user.id} userItem={user} changeUser={changeUser} isNew={isNew}/>)
            ) : (<CircularProgress sx={{padding: "20% 50%"}}/>) }
            <Pagination page={page} count={pageCount} siblingCount={0} onChange={(event, value) => setPage(value)}/>
        </Container>
    );
}

export default Users;