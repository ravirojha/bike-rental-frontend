import React, {useContext, useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import ReservationService from "../services/reservation-service";
import {AuthContext} from "../App";
import {toast} from "react-toastify";
import Rating from "@mui/material/Rating";



function ReservationDetail({reservation, changeReser}) {
    const [reserData, setReserData] = useState(reservation);
    const {user} = useContext(AuthContext);
    const [rate, setRate] = useState(false);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        ReservationService.getRating({userId: reserData.userId, bikeId: reserData.bikeId, resId: reserData.id}, user).then((res) => {
           setRating(res.data.rating);
        })
    },[]);

    function handleCancel() {
        ReservationService.cancelReservation(reserData.id,{...reserData}, user).then((res) => {
            toast.success("Reservation Cancelled");
            setReserData(res.data);
            changeReser('reload');
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }

    function handleRate(newValue) {
        setRate(false);
        if (!rating) {
            ReservationService.addRating({
                resId: reserData.id,
                userId: reserData.userId,
                bikeId: reserData.bikeId,
                rating: newValue
            }, user).then((res) => {
                setRating(res.data.rating);
            })
        }
    }

    return (
        <Container sx={{display: "flex", width: "100%"}}>
            <Card sx={{
                margin: "1rem",
                width: "70vw",
                height: "15rem",
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
            }}>
                {reserData.status === 'ACTIVE' ? <Tooltip title="Active"><Box sx={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    marginLeft: "92%",
                    backgroundColor: "green",
                    transform: 'translateY(200%)',
                }}/></Tooltip> : <Tooltip title="Inactive"><Box sx={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    marginLeft: "92%",
                    backgroundColor: "red",
                    transform: 'translateY(200%)',
                }}/></Tooltip>}
                <CardContent sx={{marginLeft: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Reservation Id : {reserData?.id}
                    </Typography>
                    <Box sx={{paddingTop: "5px", marginLeft: "0.5rem"}}>
                        <Typography variant="body2" color="text.secondary">
                            userId : {reserData?.userId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Bike ID : {reserData?.bikeId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            From : {reserData?.startDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            To : {reserData?.endDate}
                        </Typography>
                    </Box>
                    {rate && <Rating
                        name="simple-controlled"
                        sx={{paddingLeft: '5px', paddingTop: '5px'}}
                        onChange={(event, newValue) => {
                            handleRate(newValue);
                        }}
                        value={rating}
                        disabled={rating>0}
                    />}
                    <Box sx={{paddingTop: '8px'}}>
                        {!rate && <Button size="medium" onClick={() => setRate(true)}>Rate Now</Button>}
                        {reserData.status === 'ACTIVE' && <Button size="medium" onClick={handleCancel}>Cancel Reservation</Button>}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ReservationDetail;