import React, {useContext, useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';



import BikeService from "../services/bike-service";
import BikeDetails from "../components/bikeDetails";
import Filter from "../components/filter";
import AddItem from "../components/addItem";
import {AuthContext} from "../App";
import {toast} from "react-toastify";

function Bikes() {

    const {user, setUser} = useContext(AuthContext);
    const [bikeData, setBikeData] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [bit, setBit] = useState(true);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState(null);


    function changeBike(param, val) {
        if (param === 'bike') {
            setBikeData(val);
        } else if (param === 'new') {
            setIsNew(val);
        } else if (param === 'reload') {
            setBit(prev => !prev);
        } else if (param === 'filter') {
            setFilterData(val);
        }
    }

    useEffect(() => {
        setLoading(true);
        // console.log(filterData);
        BikeService.fetchBikes({page, ...filterData}, user).then((res) => {
            setBikeData(res.data.bikeData);
            setPageCount(res?.data.pageCount);
            if (page > res?.data.pageCount){

                setPage(res?.data.pageCount);
            }
            setLoading(false);
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }, [page, bit, filterData])


    return (
        <Container sx={{display: "flex"}}>
            {user?.isManager && <AddItem item={"bike"} isNew={isNew} change={changeBike}/>}
            <Filter page={page} changeBike={changeBike} bike={bikeData} filterData={{model: '', color: '', location: '', rating: 0, startDate: '', endDate: ''}}/>
            <Box sx={{
                margin: '4%',
                marginLeft: "20rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Box sx={{width: "60vw", marginTop: "2%"}}>
                    {isNew && <BikeDetails bike={{model: '', color: '', location: '', isAvailable: false}} changeBike={changeBike} isNew={isNew}/>}
                    {!loading ? bikeData?.map((bikeItem) => <BikeDetails key={bikeItem.id} bike={bikeItem}
                                                                         changeBike={changeBike} isNew={isNew} filterData={filterData}/>) :
                        <CircularProgress sx={{padding: "20% 50%"}}/>}
                </Box>

                <Pagination page={page} count={pageCount} siblingCount={0} onChange={(event, value) => setPage(value)}/>
            </Box>
        </Container>
    );
}

export default Bikes;