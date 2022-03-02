import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router";
import Auth from "../services/auth";
import {toast} from "react-toastify";

const theme = createTheme();

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSignup = (event) => {
        Auth.signup({ name, email, password }).then((res) => {
            toast.success(res);
            navigate('/login')
        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        });
    };

    return (
        <div style={{ maxWidth: "600px", margin: "100px auto" }}>
            <div>
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", marginBottom: "10px" }}
                >
                    {" "}
                    Sign up
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        required
                        id="outlined-required"
                        placeholder="Enter Name"
                        style={{ marginBottom: "10px" }}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    >
                        Name
                    </TextField>

                    <TextField
                        required
                        id="outlined-required"
                        placeholder="Enter Email"
                        style={{ marginBottom: "10px" }}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    >
                        Email
                    </TextField>

                    <TextField
                        type="password"
                        required
                        id="outlined-required"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    >
                        Password
                    </TextField>

                    <div style={{ margin: "10px 0", textAlign: "center" }}>
                        <Button variant="contained" onClick={() => handleSignup()}>
                            Sign Up{" "}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}