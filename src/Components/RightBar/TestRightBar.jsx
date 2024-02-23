/* import './rightBar.scss'
import axios from 'axios';
import React from 'react'
import UserApi from '../../Store/User/UserApi';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function RightBar() {
    const { user } = useContext(UserApi);
    const { token } = user;
    const [friendrequest, setFriendRequest] = useState([]);
    const [friendList, setFriendList] = useState([]);

    const showSuccessNotification = () => {
        toast.success('Accepted', {
            position: toast.POSITION.TOP_CENTER
        });

    };
    const config = {
        headers: {
            Authorization: `Bearer ${token}` // Set your token format here (e.g., Bearer)

        }
    }

    useEffect(() => {
        const fetchPendingRequests = async () => {

            try {
                const response = await axios.get("http://localhost:8080/api/friendship/requests/pending", config);
                setFriendRequest(response.data)



            } catch (error) {
                console.error('Cannot display Friendlist:', error);
            }
        };

        // Fetch user profile when the component mounts
        fetchPendingRequests();
    }, [user, token]);

    useEffect(() => {
        console.log('Friendlist updated:', friendList);
    }, [friendList]);

    useEffect(() => {
        friendrequest.forEach((request, index) => {
            if (request.friendshipsInitiated && request.friendshipsInitiated.length > 0) {

            }
        });
    }, [friendrequest]);

    const acceptFriendrequest = async (friendRequestId, friendRequestIndex) => {
        const id = friendrequest[0].friendshipsInitiated[0].id
        const user = friendrequest[0]
        console.log(friendrequest)


        try {
            const response = await axios.post(`http://localhost:8080/api/friendship/acceptRequest/${id}`, {}, config);

            showSuccessNotification();
            setFriendRequest(prevRequests => prevRequests.filter((_, index) => index !== friendRequestIndex));

            setFriendList(prevList => [...prevList, friendrequest[0]]);

        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };

    const declineFriendrequest = async (friendRequestId, friendRequestIndex) => {
        const id = friendrequest[0].friendshipsInitiated[0].id
        try {
            const response = await axios.post(`http://localhost:8080/api/friendship/rejectRequest/${id}`, {}, config);

            showSuccessNotification();
            setFriendRequest(prevRequests => prevRequests.filter((_, index) => index !== friendRequestIndex));

        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };


    useEffect(() => {
        const getFriendlist = async () => {
            const id = friendrequest[0].friendshipsInitiated[0].id
            try {
                const response = await axios.post(`http://localhost:8080/api/friendship/friends/${id}`, {}, config);
                console.log(response.data)
            } catch (error) {
                console.error('Cannot display Friendlist:', error);
            }
        }
        getFriendlist();

    })



    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Friend Request</span>
                    {friendrequest.map((request, index) => (
                        <div className="user" key={index}>
                            <div className="userinfo">
                                <Link to={`/profile/${request.id}`}>
                                    <img src={`data:image/png;base64, ${request.profilePicture}`} alt="Profile Picture" />
                                </Link>
                                <span>{request.firstname} {request.lastname}</span>
                            </div>
                            <div className="buttons">
                                {request.friendshipsInitiated && request.friendshipsInitiated.length > 0 && (
                                    <>
                                        <button onClick={() => acceptFriendrequest(request.friendshipsInitiated[0].id)}>Accept</button>
                                        <button onClick={() => declineFriendrequest(request.friendshipsInitiated[0].id)}>Decline</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="item">
                    <span>Friendlist</span>
                    {friendList.map((request, index) => (
                        <div className="user" key={index}>
                            <div className="userinfo">

                                <Link to={`/profile/${request.id}`}>
                                    <img src={`data:image/png;base64, ${request[0].profilePicture}`} alt="Profile Picture" />

                                </Link>
                                <span>{request[0].firstname} {request[0].lastname}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </div >
    )
}
 */