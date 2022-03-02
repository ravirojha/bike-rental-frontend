import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from "react-router";
import Tooltip from '@mui/material/Tooltip';
import {toast} from "react-toastify";
import BikeService from "../services/bike-service";
import {AuthContext} from "../App";
import Checkbox from "@mui/material/Checkbox";
import {orangeColor} from "../utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import ReservationService from "../services/reservation-service";



function BikeDetails({bike, changeBike, isNew, filterData}) {
    const [bikeData, setBikeData] = useState(bike);
    const [isEditing, setIsEditing] = useState(isNew);
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    function handleAdd() {
        BikeService.addBike({...bikeData}, user).then(() => {
            changeBike('new', !isNew)
            toast.success("Added successfully")
            changeBike('reload');
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }

    function handleUpdate() {
        BikeService.updateBike(bikeData.id,{...bikeData}, user).then(() => {
            toast.success("Updated successfully")
            changeBike('reload')
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));

    }

    function handleDelete() {
        BikeService.deleteBike(bikeData?.id, user).then(() => {
            toast.success("Deleted Successfully")
            changeBike('reload')
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }

    function handleReserve() {
        const userId = user.id;
        const bikeId = bike.id;
        if(filterData) {
            const startDate = filterData.startDate
            const endDate = filterData.endDate;
            ReservationService.addReservation({userId, bikeId, startDate, endDate}, user).then((res) => {
                toast.success("Reservation Success");
                setBikeData({...bikeData, isAvailable: false});

            }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        } else toast.error("Enter Start Date and End Date")
    }

    return (
        <Container sx={{display: "flex", width: "100%"}}>
            <Card sx={{
                margin: "1rem",
                width: "70vw",
                height: `${isEditing} : 18rem ? 14rem`,
                opacity: !isNew && (!bikeData.isAvailable ? 0.6 : 1),
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
            }}>
                {!isNew && !isEditing && (!bikeData.isAvailable ? <Tooltip title="Unavailable"><Box sx={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    marginLeft: "92%",
                    backgroundColor: "red",
                    transform: 'translateY(200%)',
                }}/></Tooltip> : <Tooltip title="Available"><Box sx={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    marginLeft: "92%",
                    backgroundColor: "green",
                    transform: 'translateY(200%)',
                }}/></Tooltip>)}
                <CardContent sx={{marginLeft: "1rem"}}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                    {!isEditing ?
                        <Typography gutterBottom variant="h5" component="div">
                        {bikeData?.model}
                         </Typography> :
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Model</InputLabel>
                        <Input defaultValue={bikeData?.model} onChange={(e) => setBikeData({
                        ...bikeData,
                        model: e.target.value
                    })}/>
                        </FormControl>}
                    {isEditing &&
                    <FormControlLabel control={<Checkbox disabled={!isEditing} sx={{
                        '&.Mui-checked': {
                            color: `${orangeColor}`,
                        },
                        paddingLeft: "80%"
                    }} checked={bikeData.isAvailable} onChange={e => setBikeData({
                        ...bikeData,
                        isAvailable: e.target.checked
                    })}/>} label="Available"/>
                    }
                    </Box>
                    <Box sx={{paddingTop: "5px", display: "flex", flexDirection: "column"}}>
                        {!isEditing ?
                            <Typography variant="body2" color="text.secondary">
                            Color : {bikeData.color}
                            </Typography> :
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Color</InputLabel>
                            <Input defaultValue={bikeData?.color} sx={{width: "50%"}} onChange={(e) => setBikeData({...bikeData, color: e.target.value})} />
                            </FormControl>}
                        {!isEditing ?
                            <Typography variant="body2" color="text.secondary">
                            Location : {bikeData.location}
                             </Typography> :
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Location</InputLabel>
                            <Input defaultValue={bikeData?.location} sx={{width: "50%"}} onChange={(e) => setBikeData({...bikeData, location: e.target.value})}/>
                            </FormControl>}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingTop: "5px"
                        }}>

                            {!isNew &&
                                <>
                                    <Typography variant="body2" color="text.secondary">Rating</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={bikeData.rating}
                                        onChange={(event, newValue) => {
                                            setBikeData({...bikeData, rating: newValue})
                                        }}
                                        disabled={true}
                                        sx={{paddingLeft: '5px'}}
                                    />
                                </>}
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{marginLeft: "1rem"}}>
                    {!isEditing && <Button size="medium" disabled={!bikeData.isAvailable} onClick={handleReserve}>Reserve</Button>}
                    {user?.isManager && !isEditing && <Button size="medium" onClick={() => {navigate(`/reservations/bike/${bikeData.id}`)}}>See Reservations</Button>}
                    {user?.isManager && (isEditing ? (
                        <>
                            <CheckIcon onClick={() => {
                                setIsEditing(false);
                                changeBike('new',false);
                                isNew ? handleAdd() : handleUpdate();
                                changeBike('reload');
                            }} sx={{color: "green", cursor: "pointer"}}/>
                            <CloseIcon onClick={() => {
                                setIsEditing(false);
                                changeBike('new', false);
                                setBikeData(bike);
                            }} sx={{color: "red", cursor: "pointer"}}/>
                    </>) : (
                        <>
                            <EditIcon onClick={() => setIsEditing(true)} sx={{cursor: "pointer"}}/>
                            <DeleteIcon sx={{color: "red", cursor: "pointer"}} onClick={() => {
                                handleDelete();
                                changeBike('reload');
                            }}/>
                    </>))}

                </CardActions>
            </Card>
        </Container>
    );
}

export default BikeDetails;