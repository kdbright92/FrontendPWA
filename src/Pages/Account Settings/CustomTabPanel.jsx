import React, { useState, useContext } from 'react';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Link } from '@mui/material';
import { ListItem } from '@mui/material';
import { List } from '@mui/material';
import { Container } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/material';
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import { MenuItem as OptionItem } from '@mui/material';
import { Select } from '@mui/material';
import { Checkbox } from '@mui/material';
import UserApi from '../../Store/User/UserApi';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useRef } from 'react';




export default function ProfileSetting() {
    const [newCountry, setNewCountry] = useState('');
    const [newCity, setNewCity] = useState('');

    const { user, clearUser } = useContext(UserApi);
    const { token, userId } = user;
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(''); // New state for profile picture

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const showSuccessNotification = () => {
        toast.success('Succesfully Changed', {
            position: toast.POSITION.TOP_CENTER
        });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if the file type is allowed (e.g., image)
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFile(reader.result.split(',')[1]);
                };
                reader.readAsDataURL(file);

            } else {
                // Handle the case where the file type is not allowed
                console.error('Invalid file type. Please select an image.');
            }
        }
    };
    const handleUpdateUser = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const data = {
            newUsername,
            newPassword,
            newCountry,
            newCity,
            selectedFile
        };

        try {
            const response = await axios.put(`https://localhost:8443/api/profile/${userId}`, data, config);

            localStorage.removeItem('accessToken'); // Clear any token or user data in local storage

            // Update the UserProvider context (set the user to null or default value)
            clearUser(); // Assuming setUser is a function from your UserProvider

            // Redirect to the login page after logout
            showSuccessNotification();
            navigate('/register');
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <Box
            sx={{
                fontFamily: 'Segoe UI,system-ui,sans-serif',
                display: 'flex',
                columnGap: '30px',
                maxWidth: '1000px',
                width: '100%',
                marginTop: '7%',
                marginleft: '5%',
                backgroundColor: '#whitesmoke',
            }}>
            <Container
                sx={{
                    height: '300px',
                    width: '25%',
                    ' @media(max-width:991px)': { display: 'none' },
                    ' @media(max-width:479px)': { display: 'none' },
                }}>
                <Typography
                    variant="h3"
                    sx={{ fontFamily: 'Segoe UI,system-ui,sans-serif' }}>
                    Your profile
                </Typography>
                <Divider
                    sx={{ margin: '12px 0px', width: '100%', height: '1px' }}
                    color="#9ca3af"
                    style={{ width: '100%' }}></Divider>
                <List sx={{ listStyleType: 'none', paddingLeft: '0px', width: '100%' }}>
                    <ListItem sx={{ marginTop: '10px', display: 'block' }}>
                        <Link
                            sx={{
                                backgroundColor: '#whitesmoke',
                                alignItems: 'center',
                                width: '100%',
                                columnGap: '10px',
                                display: 'flex',
                                textDecoration: 'none',
                                color: '#0d2036',
                            }}>
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIGRhdGEtbmFtZT0iMDEgYWxpZ24gY2VudGVyIj48cGF0aCBkPSJNMjEgMjRoLTJ2LTUuMDQzQTIuOTYgMi45NiAwIDAgMCAxNi4wNDMgMTZINy45NTdBMi45NiAyLjk2IDAgMCAwIDUgMTguOTU3VjI0SDN2LTUuMDQzQTQuOTYzIDQuOTYzIDAgMCAxIDcuOTU3IDE0aDguMDg2QTQuOTYzIDQuOTYzIDAgMCAxIDIxIDE4Ljk1N1pNMTIgMTJhNiA2IDAgMSAxIDYtNiA2LjAwNiA2LjAwNiAwIDAgMS02IDZabTAtMTBhNCA0IDAgMSAwIDQgNCA0IDQgMCAwIDAtNC00WiIgZmlsbD0iIzZlNmU2ZSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                                width="20px"
                                height="20px"
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'Segoe UI,system-ui,sans-serif',
                                    fontWeight: '500',
                                }}>
                                Profile settings
                            </Typography>
                        </Link>
                    </ListItem>

                </List>
            </Container>
            <Stack
                sx={{
                    alignItems: 'flex-start',
                    maxWidth: '600px',
                    width: '100%',
                    padding: '10px 10px',
                    ' @media(max-width:991px)': { maxWidth: '700px' },
                    ' @media(max-width:479px)': { width: '100%', paddingTop: '10px' },
                }}
                spacing="10px">
                <List
                    sx={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#whitesmoke',
                        display: 'none',
                        flexWrap: 'wrap',
                        gap: '15px',
                        ' @media(max-width:991px)': { display: 'flex' },
                        ' @media(max-width:479px)': { display: 'flex' },
                    }}>
                    <ListItem sx={{ display: 'block' }}>
                        <Link
                            sx={{
                                backgroundColor: '#whitesmoke',
                                alignItems: 'center',
                                width: '100%',
                                columnGap: '10px',
                                display: 'flex',
                                textDecoration: 'none',
                                color: '#0d2036',
                            }}>
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIGRhdGEtbmFtZT0iMDEgYWxpZ24gY2VudGVyIj48cGF0aCBkPSJNMjEgMjRoLTJ2LTUuMDQzQTIuOTYgMi45NiAwIDAgMCAxNi4wNDMgMTZINy45NTdBMi45NiAyLjk2IDAgMCAwIDUgMTguOTU3VjI0SDN2LTUuMDQzQTQuOTYzIDQuOTYzIDAgMCAxIDcuOTU3IDE0aDguMDg2QTQuOTYzIDQuOTYzIDAgMCAxIDIxIDE4Ljk1N1pNMTIgMTJhNiA2IDAgMSAxIDYtNiA2LjAwNiA2LjAwNiAwIDAgMS02IDZabTAtMTBhNCA0IDAgMSAwIDQgNCA0IDQgMCAwIDAtNC00WiIgZmlsbD0iIzZlNmU2ZSIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                                width="20px"
                                height="20px"
                            />
                            <Typography variant="h5" sx={{ fontWeight: '500' }}>
                                Profile settings
                            </Typography>
                        </Link>
                    </ListItem>

                </List>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'space-between',
                        ' @media(max-width:479px)': {
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    }}>
                    <Stack
                        sx={{
                            alignItems: 'flex-start',
                            width: '60%',
                            ' @media(max-width:479px)': { width: '100%', order: '2' },
                        }}
                        spacing="10px">

                        <Stack
                            sx={{ alignItems: 'flex-start', width: '100%' }}
                            spacing="7px">
                            <InputLabel
                                sx={{
                                    color: 'inherit',
                                    ' @media(max-width:479px)': { fontSize: '14px' },
                                }}>
                                Username
                            </InputLabel>
                            <Input
                                sx={{
                                    borderRadius: '0.125rem',
                                    padding: '7px',
                                    width: '100%',
                                    backgroundColor: 'inherit',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                }}
                                placeholder="Enter Username"
                                type="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)} disableUnderline></Input>
                        </Stack>
                        <Stack
                            sx={{ width: '100%', alignItems: 'flex-start' }}
                            spacing="7px">
                            <InputLabel
                                sx={{
                                    color: 'inherit',
                                    ' @media(max-width:479px)': { fontSize: '14px' },
                                }}>
                                City
                            </InputLabel>
                            <Stack
                                sx={{
                                    borderRadius: '0.125rem',
                                    alignItems: 'center',
                                    border: '1px solid rgb(186, 186, 186)',
                                    width: '100%',
                                }}
                                spacing="0px"
                                direction="row">
                                <Input
                                    sx={{
                                        border: 'none',
                                        width: '300px',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                    }}
                                    placeholder="Enter City"
                                    type="text"
                                    value={newCity}
                                    onChange={(e) => setNewCity(e.target.value)}
                                    disableUnderline></Input>

                            </Stack>
                        </Stack>
                        <Stack
                            sx={{ width: '100%', alignItems: 'flex-start' }}
                            spacing="7px">
                            <InputLabel
                                sx={{
                                    color: 'inherit',
                                    ' @media(max-width:479px)': { fontSize: '14px' },
                                }}>
                                Country
                            </InputLabel>
                            <Stack
                                sx={{
                                    borderRadius: '0.125rem',
                                    alignItems: 'center',
                                    border: '1px solid rgb(186, 186, 186)',
                                    width: '100%',
                                }}
                                spacing="0px"
                                direction="row">
                                <Input
                                    sx={{
                                        border: 'none',
                                        width: '300px',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                    }}
                                    placeholder="Enter Country"
                                    type="text"
                                    value={newCountry}
                                    onChange={(e) => setNewCountry(e.target.value)}
                                    disableUnderline></Input>

                            </Stack>
                        </Stack>
                        <Stack
                            sx={{ width: '100%', alignItems: 'flex-start' }}
                            spacing="7px">
                            <InputLabel
                                sx={{
                                    color: 'inherit',
                                    ' @media(max-width:479px)': { fontSize: '14px' },
                                }}>
                                Password
                            </InputLabel>
                            <Stack
                                sx={{
                                    borderRadius: '0.125rem',
                                    alignItems: 'center',
                                    border: '1px solid rgb(186, 186, 186)',
                                    width: '100%',
                                }}
                                spacing="0px"
                                direction="row">
                                <Input
                                    sx={{
                                        border: 'none',
                                        width: '300px',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                    }}
                                    placeholder="Enter Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disableUnderline></Input>

                            </Stack>
                        </Stack>
                        <Stack
                            sx={{ width: '100%', alignItems: 'flex-start' }}
                            spacing="7px">
                            <InputLabel
                                sx={{
                                    color: 'inherit',
                                    ' @media(max-width:479px)': { fontSize: '14px' },
                                }}>
                                Confirm Password
                            </InputLabel>
                            <Input
                                sx={{
                                    borderRadius: '0.125rem',
                                    backgroundColor: '#whitesmoke',
                                    padding: '7px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                }}
                                placeholder="Confirm Password"
                                type="password"
                                disableUnderline></Input>
                        </Stack>
                        <Button
                            variant="contained"
                            onClick={handleUpdateUser}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '150px',
                                padding: '10px',
                                backgroundColor: '#1677ff',
                                border: '1px solid rgb(240, 240, 240)',
                                fontWeight: '600',
                                color: 'white',
                                textTransform: 'none',
                            }}>
                            Change Settings                        </Button>
                    </Stack>
                    <Stack
                        sx={{
                            width: '40%',
                            alignItems: 'center',
                            ' @media(max-width:479px)': { width: '100%' },
                        }}
                        spacing="10px">
                        {selectedFile ? (
                            <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" src={`data:image/png;base64, ${selectedFile}`} />
                        ) : (
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            </Avatar>
                        )}


                        <Button
                            variant="contained"
                            onClick={handleButtonClick}
                            sx={{
                                borderRadius: '4px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '7px',
                                backgroundColor: 'transparent',
                                border: '1px solid rgb(186, 186, 186)',
                                whiteSpace: 'nowrap',
                                fontWeight: '600',
                                color: '#0d2036',
                                textTransform: 'none',
                            }}
                        >
                            Change avatar
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                    </Stack>
                </Box>

            </Stack>
        </Box>
    );
}
