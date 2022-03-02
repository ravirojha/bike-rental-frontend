import React, {useContext, useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import ReservationDetail from "../components/reservationDetail";
import ReservationService from "../services/reservation-service";
import {useLocation, useParams} from "react-router";
import {toast} from "react-toastify";
import {AuthContext} from "../App";

function Reservations() {
    const { id } = useParams();
    const location = useLocation();
    const [reser, setReser] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [bit, setBit] = useState(true);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);

    function changeReser(param, val) {
        if (param === 'reser') {
            setReser(val);
        } else if (param = 'new') {
            setIsNew(val);
        } else if (param = 'reload') {
            setBit(prev => !prev);
        }
    }


    useEffect(() => {
        setLoading(true);
        const path = location.pathname.split('/')[2];
        if(path === 'bike') {
            ReservationService.getResByBikeId(id, {page}, user).then((res => {
                console.log(res);
                setReser(res?.data?.reservations);
                setPageCount(res?.data.pageCount);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setLoading(false);
            })).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        } else if(path === 'user') {
            ReservationService.getResByUserId(id, {page}, user).then((res => {
                console.log(res);
                setReser(res?.data?.reservations);
                setPageCount(res?.data.pageCount);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setLoading(false);
            })).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        } else {
            ReservationService.fetchReservations({page}, user).then((res => {
                setReser(res?.data?.reservations);
                setPageCount(res?.data.pageCount);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setLoading(false);
            })).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        }
    }, [page, bit, id, location.pathname]);



    return (
        <Container sx={{width: "60vw", marginTop: "6.5%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {!loading ? reser?.map((reservation) => (<ReservationDetail key={reservation.id} reservation={reservation} changeReser={changeReser}/>)
            ) : (<CircularProgress sx={{padding: "20% 50%"}}/>) }
            {reser?.length === 0 && <h1>No items Found</h1>}
            <Pagination page={page} count={pageCount} siblingCount={0} onChange={(event, value) => setPage(value)}/>
        </Container>
    );
}

export default Reservations;