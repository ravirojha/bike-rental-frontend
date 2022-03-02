import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Auth from '../services/auth';
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";
import {useContext} from "react";
import {AuthContext} from "../App";
import {validateLoginForm} from "../utils";


const theme = createTheme();

export default function Login() {
    const [cookies, setCookie] = useCookies(["user"]);
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (validateLoginForm(data.get('email'), data.get('password'))) {
            Auth.login({
                email: data.get('email'),
                password: data.get('password'),
            }).then((res) => {
                toast.success("Logged in successfully");
                setCookie("user", res.data, {path: '/'});
                setUser(res.data);
                navigate("/");
            }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <BikeScooterIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <span> Don't have an account? </span>
                                <Link href="/signup" variant="body2" sx={{paddingLeft: "12px"}}>
                                    {"Sign Up"}
                                </Link>
                                <Link target="_blank" href="https://docs.google.com/document/d/16PvgOV7Afj9Abjj_AiejMyxDjs4ihG9105FOlmcLHlg/edit?usp=sharing" variant="body2" sx={{paddingLeft: "12px"}}>
                                    {"Login details"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}