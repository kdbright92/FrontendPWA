import './rightBar.scss'
import axios from 'axios';
import React from 'react'
import UserApi from '../../Store/User/UserApi';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';


export default function RightBar() {
    const { user, updateUser } = useContext(UserApi);
    const { token, userId } = user;
    const [friendrequest, setFriendRequest] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [updatePendingRequests, setUpdatePendingRequests] = useState(false);
    const [isFriendListCollapsed, setIsFriendListCollapsed] = useState(true);
    const [friendrequestlenght, setfriendrequestlenght] = useState(0);






    const showSuccessNotification = () => {
        toast.success('Success', {
            position: toast.POSITION.TOP_CENTER
        });




    };

    const showFailNotification = () => {
        toast.success('Declined', {
            position: toast.POSITION.TOP_CENTER
        });

    };
    const config = {
        headers: {
            Authorization: `Bearer ${token}`

        }
    }

    const toggleFriendListVisibility = () => {
        setIsFriendListCollapsed(!isFriendListCollapsed);
    };

    useEffect(() => {
        const fetchPendingRequests = async () => {
            const id = userId

            try {
                const response = await axios.get(`https://localhost:8443/api/friendship/requests/pending/${id}`, config);
                setFriendRequest(response.data)
                setUpdatePendingRequests(true);
                const fr = response.data.length;
                setfriendrequestlenght(fr);





            } catch (error) {
                console.error('Cannot display Friendlist:', error);
            }
        };

        fetchPendingRequests();
        updateUser({ friendrequestlenght });
    }, [updatePendingRequests]);




    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await axios.get('https://localhost:8443/api/friendship/friends', config);
                setFriendList(response.data);


            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };

        fetchFriendList();
    }, [updatePendingRequests]);

    const acceptFriendRequest = async (id) => {
        try {
            await axios.post(`https://localhost:8443/api/friendship/acceptRequest/${id}`, {}, config);
            showSuccessNotification();
            setUpdatePendingRequests(false);
            setFriendRequest((prevRequests) => prevRequests.filter((request) => request.id !== id));


        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };




    const declineFriendrequest = async (id) => {

        try {
            const response = await axios.post(`https://localhost:8443/api/friendship/rejectRequest/${id}`, {}, config);

            showFailNotification();

            setFriendRequest((prevRequests) => prevRequests.filter((request) => request.id !== id));
            setUpdatePendingRequests(false);

        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };






    return (
        <Container maxWidth="sm">

            <div className="rightBar">
                <div className="container">
                    <div className="item">
                        <span>Friend Request</span>
                        {friendrequest.map((request, index) => (
                            <div className="user" key={index}>
                                <div className="userinfo">
                                    <Link to={`/profile/${request.requester.id}`}>
                                        <img src={`data:image/png;base64, ${request.requester.profilePicture}`} alt="Profile Picture" />
                                    </Link>
                                    <span>{request.requester.firstname} {request.requester.lastname}</span>
                                </div>
                                <div className="buttons">

                                    <>
                                        <Button variant="contained" color="primary" onClick={() => acceptFriendRequest(request.id)}>
                                            Accept
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => declineFriendrequest(request.id)}>
                                            Decline
                                        </Button>
                                    </>

                                </div>
                            </div>
                        ))}
                    </div>

                    {friendList.length > 0 && (
                        <div className="item">
                            <span style={{ marginRight: '240px' }} >Friendlist</span>
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
        </Container>

    );

}
