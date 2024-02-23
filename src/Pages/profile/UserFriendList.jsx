
import './userFriendList.scss'
import axios from 'axios';
import React from 'react'
import UserApi from '../../Store/User/UserApi';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Container from '@mui/material/Container'; // Added Container
import Button from '@mui/material/Button';


export default function UserFriendList({ userId, currentuser }) {
    const { user, updateUser } = useContext(UserApi);
    const { token } = user;
    const [friendrequest, setFriendRequest] = useState([]);
    const [allFriendRequests, setallFriendRequests] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [updatePendingRequests, setUpdatePendingRequests] = useState(false);
    const [isFriendListCollapsed, setIsFriendListCollapsed] = useState(true);
    const [friendrequestlenght, setfriendrequestlenght] = useState(0);



    const config = {
        headers: {
            Authorization: `Bearer ${token}` // Set your token format here (e.g., Bearer)

        }
    }

    const toggleFriendListVisibility = () => {
        setIsFriendListCollapsed(!isFriendListCollapsed);
    };

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const id = userId

                const response = await axios.get(`https://localhost:8443/api/friendship/friends/${id}`, config);
                setFriendList(response.data);
                setUpdatePendingRequests(true);
                const fr = response.data.length;
                setfriendrequestlenght(fr);


            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };


        fetchFriendList();
        updateUser({ friendrequestlenght });
    }, [userId]);


    return (


        <div className="rightBarr">
            <div className="container">


                {friendList.length > 0 && (
                    <div className="item">
                        <span style={{ marginRight: '240px' }} > {currentuser.firstname} {currentuser.lastname}  Friends</span>
                        {friendList.length <= 5 || !isFriendListCollapsed ? (
                            <>
                                {friendList.map((request, index) => (
                                    <div className="user" key={index}>
                                        <div className="userinfo">
                                            <Link to={`/profile/${request.id}`}>
                                                {request.profilePicture && (
                                                    <img src={`data:image/png;base64, ${request.profilePicture}`} alt="Profile Picture" />
                                                )}
                                            </Link>
                                            <span>{request.firstname} {request.lastname}</span>
                                        </div>
                                    </div>
                                ))}
                                {friendList.length > 5 && (
                                    <Button variant="contained" onClick={toggleFriendListVisibility}>
                                        {isFriendListCollapsed ? `Show More (${friendList.length - 5} more)` : 'Show Less'}
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Button variant="contained" onClick={toggleFriendListVisibility}>
                                Show More ({friendList.length})
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>


    );

}
