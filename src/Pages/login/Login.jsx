import "./login.scss"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Share from "../../Components/Share/Share";
import UserApi from "../../Store/User/UserApi";
import { useContext } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


const defaultTheme = createTheme();

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { updateUser } = useContext(UserApi);




    const showSuccessNotification = () => {
        toast.success('Login successful!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const url = "https://localhost:8443/api/user/login";

        try {
            const response = await axios.post(url, { username, password });
            const token = response.data.token;
            const profilePicture = response.data.user.profilePicture
            const firstname = response.data.user.firstname;
            const lastname = response.data.user.lastname;
            const userId = response.data.user.id;

            if (token) {
                showSuccessNotification();
                updateUser({ firstname, lastname, token, username, profilePicture, userId });

                navigate("/home");

            } else {
                toast.error('Login failed. Invalid credentials.', {
                    position: toast.POSITION.TOP_CENTER
                });
                console.log('Bearer token not found');
            }
        } catch (error) {
            toast.error('Login failed. Invalid credentials.', {
                position: toast.POSITION.TOP_CENTER
            });
            console.error("Error:", error);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up

                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => setUsername(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider >
    );
}
