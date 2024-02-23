/* import React from 'react'
import "./profile.scss"
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import Posts from '../../Components/Posts/Posts'
import UserApi from '../../Store/User/UserApi';
import Avatar from '@mui/material/Avatar';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import Container from '@mui/material/Container'; // Added Container


export default function Profile() {

    const { user } = useContext(UserApi);
    const { token, userId } = user;
    const { id } = useParams();
    const [userposts, setUserPosts] = useState([]);



    const location = useLocation();




    const showSuccessNotification = () => {
        toast.success('Send Request', {
            position: toast.POSITION.TOP_CENTER
        });
    };


    const [profileUser, setProfileUser] = useState("");

    const follow = async () => {

        try {
            const response = await axios.post(`https://localhost:8443/api/friendship/sendRequest/${id}`, {}, config);

            showSuccessNotification();


        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };


    const config = {
        headers: {
            Authorization: `Bearer ${token}` // Set your token format here (e.g., Bearer)

        }


    };
    useEffect(() => {
        const fetchUserProfile = async () => {

            try {
                const response = await axios.get(`https://localhost:8443/api/profile/${id}`, config);


                setProfileUser(response.data);

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        // Fetch user profile when the component mounts
        fetchUserProfile();
    }, [id]);



    return (


        <div className="profile">
            <div className="images">

                <img src="https://images.pexels.com/photos/19456584/pexels-photo-19456584/free-photo-of-lebensmittel-restaurant-strasse-mexikanisch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='cover' />

                <img src={`data:image/png;base64, ${profileUser.profilePicture}`} alt="Profile Picture" className='profilePic' />
            </div>

            <div className="profileContainer">
                <div className="center">
                    <span> {profileUser.firstname} {profileUser.lastname}</span>
                    <div className="info">

                        <div className="item">
                            <LanguageIcon />
                            <span>{profileUser.country}</span>
                        </div>
                        <div className="item">

                            <PlaceIcon />
                            <span>{profileUser.city}</span>
                        </div>
                        <Button variant="contained" onClick={follow}>

                            Follow


                        </Button>

                    </div>



                </div>

            </div>


            <div className='posts'>
                <Posts showUserPosts={true} userId={id} />
            </div>

        </div>

    )
}



 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, useTheme } from '@mui/system';
import Posts from '../../Components/Posts/Posts';
import UserApi from '../../Store/User/UserApi';
import UserFriendList from './UserFriendList';
import LeftBar from '../../Components/LeftBar/LeftBar'



const Profile = () => {
    const { user } = useContext(UserApi);
    const { token, userId } = user;
    const { id } = useParams();
    const [profileUser, setProfileUser] = useState('');
    const theme = useTheme();
    const location = useLocation();
    const [randomImage, setRandomImage] = useState('');

    const showSuccessNotification = () => {
        toast.success('Send Request', {
            position: toast.POSITION.TOP_CENTER,
        });
    };




    useEffect(() => {
        // Array of image URLs
        const imageUrls = [
            'https://corporate.walmart.com/content/corporate/en_us/purpose/sustainability/planet/nature/jcr:content/par/image_2_0.img.png/1693432526985.png://pixabay.com/get/g7d8aaa75a8ee3444516d6b8d13418bf9af85a1db78c124eb86f9379803c175bc53c48963a848ba187c844733401fcb93_1280.jpg',
            'https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/library/our-cause/on-the-shore-borrowdale-and-derwent-water-1518851.jpg?auto=webp&width=1440&crop=16:7&dpr=2',
            'https://s3.eu-west-1.amazonaws.com/presspage-production-content/uploads/2580/nature_and_happiness-503786.jpg',
            'https://hips.hearstapps.com/hmg-prod/images/nature-quotes-landscape-1648265299.jpg?crop=1.00xw:0.760xh;0,0.0587xh&resize=1200:*'
        ];

        // Select a random image URL
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const selectedImage = imageUrls[randomIndex];

        // Set the random image URL to state
        setRandomImage(selectedImage);
    }, [id]);

    const follow = async () => {
        try {
            const response = await axios.post(`https://localhost:8443/api/friendship/sendRequest/${id}`, {}, config);

            showSuccessNotification();
        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`https://localhost:8443/api/profile/${id}`, config);
                setProfileUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <style>
                    {`
                        @media (max-width: 600px) {
                            .div {
                                display: none;
                            }
                        }
                    `}
                </style>
                <LeftBar />
            </div>
            <Container maxWidth="md" sx={{ marginTop: theme.spacing(9) }}  >
                <Grid container spacing={3} >
                    <Grid item xs={12} md={12} >
                        <Paper sx={{ padding: theme.spacing(2), }} >
                            <img
                                src={randomImage}
                                alt=""
                                style={{ height: '30%', width: '100%', borderRadius: '2%', objectFit: 'cover', }}
                            />
                            <Avatar
                                alt="Profile Picture"
                                src={`data:image/png;base64, ${profileUser.profilePicture}`}
                                sx={{ width: '15vw', height: '15vw', position: 'relative', top: '-1vw', left: '50%', transform: 'translateX(-50%) translateY(-50%)', zIndex: 3 }}
                            />


                            <Grid item xs={12} md={10} >
                                <Grid >
                                    <Grid item xs={19} >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', fontWeight: 'bold', paddingBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                                <span >{profileUser.firstname} {profileUser.lastname}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                                <LanguageIcon />
                                                <span >{profileUser.country}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <PlaceIcon />
                                                <span>{profileUser.city}</span>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={follow}>
                                            Follow
                                        </Button>

                                    </Grid>
                                </Grid>

                            </Grid>

                        </Paper>



                        <div className={location.pathname === '/profile' ? 'posts' : 'mobilePosts'} >
                            <Posts showUserPosts={true} userId={id} />

                        </div>
                    </Grid>
                </Grid>

            </Container >
            <div className="div">
                <style>
                    {`
                        @media (max-width: 600px) {
                            .div {
                                display: none;
                            }
                        }
                    `}
                </style>
                <UserFriendList userId={id} currentuser={profileUser} />
            </div>
        </div >




    );
};

export default Profile;
