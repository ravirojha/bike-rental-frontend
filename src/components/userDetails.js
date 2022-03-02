import React, {useContext, useState} from 'react';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import CardActions from "@mui/material/CardActions";
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import {orangeColor} from "../utils";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from "react-router";
import UserService from "../services/user-service";
import {toast} from "react-toastify";
import BikeService from "../services/bike-service";
import {AuthContext} from "../App";


function UserDetails({userItem, changeUser, isNew}) {
    const [userData, setUserData] = useState(userItem);
    const [isEditing, setIsEditing] = useState(isNew);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const validateData = () => {
        if (!userData.name || userData.name.trim().length < 1)
            toast.error("Valid name of atleast 1 char is required");
        else if (!userData.email || /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userData.email)) toast.error("Provide a valid email");
        else if (!userData.password || userData.password.trim().length < 4) toast.error("Enter valid password of more than 4 characters");
        else return true;
    };


    function handleAdd() {
        if (validateData()) {
            UserService.addUser({...userData}, user).then(() => {
                changeUser('new', !isNew)
                toast.success("Added successfully")
                changeUser('reload');
            }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
            setIsEditing(false);
            changeUser('new',false);
        }
    }

    function handleUpdate() {
        if (validateData()) {
            UserService.updateUser(userData?.id, {...userData}, user).then(() => {
                toast.success("Updated successfully")
                changeUser('reload')
            }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
            setIsEditing(false);
            changeUser('new',false);
        }

    }

    function handleDelete() {
        UserService.deleteUser(userData?.id, user).then(() => {
            toast.success("Deleted Successfully")
            changeUser('reload')
        }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
    }


    return (
        <Container sx={{display: "flex", width: "100%"}}>
            <Card sx={{
                margin: "1rem",
                width: "70vw",
                height: `${isEditing} : 18rem ? 14rem`,
                boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
            }}>
                <CardContent sx={{marginLeft: "1rem"}}>
                    {!isEditing ? <Typography gutterBottom variant="h5" component="div">
                            {userData?.name}
                        </Typography> :
                        <FormControl variant="standard" sx={{width: "50%"}} >
                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input defaultValue={userData?.name}
                               onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                        </FormControl>
                               }

                    <Box sx={{paddingTop: "5px", display: "flex", flexDirection: "column"}}>
                        {!isEditing && <Typography variant="body2" color="text.secondary">
                            id : {userData.id}
                        </Typography>}
                        {!isEditing ? <Typography variant="body2" color="text.secondary">
                            email : {userData.email}
                        </Typography> :
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Email</InputLabel>
                            <Input defaultValue={userData?.email} sx={{width: "50%"}}
                                               onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                            </FormControl>}
                        {isEditing &&
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">Password</InputLabel>
                            <Input defaultValue={userData?.password} sx={{width: "50%"}} type="password"
                                   onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                        </FormControl>
                        }
                        <FormControlLabel control={<Checkbox disabled={!isEditing} sx={{
                            '&.Mui-checked': {
                                color: `${orangeColor}`,
                            },
                        }} checked={userData.isManager} onChange={e => setUserData({
                            ...userData,
                            isManager: e.target.checked
                        })}/>} label="Manager"/>
                    </Box>
                </CardContent>
                <CardActions sx={{marginLeft: "1rem"}}>
                    {!isEditing && <Button size="medium" onClick={() => {navigate(`/reservations/user/${userData.id}`)}}>See Reservations</Button>}
                    {isEditing ? (
                        <>
                            <CheckIcon onClick={() => {
                                isNew ? handleAdd() : handleUpdate();
                            }} sx={{color: "green", cursor: "pointer"}}/>
                            <CloseIcon onClick={() => {
                                setIsEditing(false);
                                changeUser('new', false);
                                    setUserData(userItem);
                            }} sx={{color: "red", cursor: "pointer"}}/>
                        </>) : (
                        <>
                            <EditIcon onClick={() => setIsEditing(true)} sx={{cursor: "pointer"}}/>
                            <DeleteIcon onClick={() => {
                                handleDelete();
                                changeUser('reload');
                            }} sx={{color: "red", cursor: "pointer"}}/>
                        </>)}

                </CardActions>
            </Card>
        </Container>
    );
}

export default UserDetails;