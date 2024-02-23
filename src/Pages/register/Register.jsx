import "./register.scss"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserApi from "../../Store/User/UserApi";
import React, { useContext, useEffect } from 'react';


// export default function Register(onFormSwitch) {
//     const [username, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const navigate = useNavigate();
//     const { updateUserRegistration } = useContext(UserApi);

//     const showSuccessNotification = () => {
//         toast.success('Registration successful!', {
//             position: toast.POSITION.TOP_CENTER
//         });
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         const url = "http://localhost:8080/api/user/register";

//         const registerUser = {
//             username,
//             password,
//             firstname,
//             lastname
//         };

//         try {
//             const response = await axios.post(url, {
//                 username,
//                 password,
//                 firstname,
//                 lastname
//             })

//             if (response.status === 201) {
//                 // Registration successful, navigate to the login page
//                 showSuccessNotification();
//                 updateUserRegistration({ firstname, lastname });
//                 navigate("/login");

//             } else {
//                 // Handle unsuccessful registration
//                 console.error("Registration failed:", response.data);
//                 // You may want to show an error message to the user here
//             }
//         } catch (error) {
//             // Handle any network errors or exceptions
//             console.error("Error during registration:", error);
//             // Show an error message to the user or handle the error accordingly
//         }
//     };



//     return (
//         <div className="register">
//             <div className="card">
//                 <div className="left">
//                     <h1>Master Arbeit.</h1>
//                     <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
//                         alias totam numquam ipsa exercitationem dignissimos, error nam,
//                         consequatur.
//                     </p>
//                     <span>Do  you have an account?</span>
//                     <Link to="/login">
//                         <button>Login</button>
//                     </Link>

//                 </div>
//                 <div className="right">
//                     <h1>Register</h1>
//                     <form onSubmit={handleRegister}>
//                         <input type="text" placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} />
//                         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//                         <input type="text" placeholder="Firstname" value={firstname} onChange={e => setFirstname(e.target.value)} />
//                         <input type="text" placeholder="Lastname" value={lastname} onChange={e => setLastname(e.target.value)} />
//                         <button  >Register</button>

//                     </form>
//                 </div>
//             </div>
//         </div >



//     )

// }

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
/* import axiosInstance from './api';
 */


const defaultTheme = createTheme();

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(''); // New state for profile picture
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showDoneIcon, setShowDoneIcon] = useState(false);
    const { updateUserRegistration, updateProfilePicture } = useContext(UserApi);


    const showSuccessNotification = () => {
        toast.success('Registration successful!', {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const handleSuccessfulUpload = () => {
        setUploadSuccess(true);
        setShowDoneIcon(true); // Set the success state to true
        setTimeout(() => {
            setUploadSuccess(false);
            setShowDoneIcon(false); // Reset the success state after a delay (e.g., 3 seconds)
        }, 3000);
        // Change the delay as needed
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if the file type is allowed (e.g., image)
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFile(reader.result.split(',')[1]);
                    handleSuccessfulUpload();
                };
                reader.readAsDataURL(file);

            } else {
                // Handle the case where the file type is not allowed
                console.error('Invalid file type. Please select an image.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://localhost:8443/api/user/register";


        try {
            const response = await axios.post(url, {
                username,
                password,
                firstname,
                lastname,
                selectedFile,
                country,
                city

            })


            if (response.status === 201) {
                // Registration successful, navigate to the login page
                const userId = response.data;

                showSuccessNotification();
                if (selectedFile) {
                    updateUserRegistration({ firstname, lastname, country, userId, city });
                    updateProfilePicture(selectedFile); // Update profile picture in the context
                    navigate("/login");
                } else {
                    updateUserRegistration({ firstname, lastname, country, city });
                    navigate("/login");
                }



            } else {
                // Handle unsuccessful registration
                console.error("Registration failed:", response.data);
                // You may want to show an error message to the user here
            }
        } catch (error) {
            // Handle any network errors or exceptions
            console.error("Error during registration:", error);
            // Show an error message to the user or handle the error accordingly
        }


    };
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
                    {selectedFile ? (
                        <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" src={`data:image/png;base64, ${selectedFile}`} />
                    ) : (
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    )}

                    <Typography component="h1" variant="h5">
                        Sign up

                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={e => setFirstname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    autoFocus
                                    onChange={e => setLastname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country"
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="city"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    autoFocus
                                    onChange={e => setCity(e.target.value)}

                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Input field for profile picture */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}

                                />
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider >
    );

};



