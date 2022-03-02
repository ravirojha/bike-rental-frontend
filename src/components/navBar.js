import React, {useContext} from 'react';
import { useCookies} from "react-cookie";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../App";

import styled from "styled-components";
import {toast} from "react-toastify";
import {orangeColor} from "../utils";


function NavBar(props) {
    const {user, setUser} = useContext(AuthContext);
    const [,  , removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success("Logged out successfully");
        removeCookie("user", {path: '/'});
        setUser(null);
        navigate('/');
    }



    return (
        <StyledComponents>
            <Box sx={{flexGrow: 1, position: 'fixed', width: "100%", zIndex: "2", top: "0"}}>
                <AppBar position="static" sx={{backgroundColor: `${orangeColor}`}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{
                            flexGrow: 1, display: 'flex',
                            justifyContent: 'flexStart',
                        }}>
                            <Link className="link-style" to="/">
                                Bikes
                            </Link>
                            <Link className="link-style" to= {user?.isManager ? "/reservations" : `/reservations/user/${user.id}`}>
                                Reservations
                            </Link>
                            {user?.isManager && (
                                <Link
                                    className="link-style"
                                    to="/users"
                                    style={{marginLeft: "15px"}}
                                >
                                    Users
                                </Link>
                            )}
                        </Typography>

                        <Button color="inherit" className="link-style" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </StyledComponents>
    );
}

export default NavBar;

const StyledComponents = styled.div`
  .link-style {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    margin-left: 15px;
  }
`;