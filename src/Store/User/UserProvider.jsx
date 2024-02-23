import React, { useState, useEffect } from "react";
import UserApi from './UserApi';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {
            token: null,
            username: '',
            firstname: '',
            lastname: '',
            profilePicture: null,
            location: '',
            userId: '',
            friendrequestlenght: null,



        };
    });

    const updateProfilePicture = (picture) => {
        setUser((prevUser) => ({
            ...prevUser,
            profilePicture: picture,
        }));
    };

    const updateUser = (newUserData) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, ...newUserData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    const updateUserRegistration = (userData) => {
        setUser((prevUser) => ({
            ...prevUser,
            firstname: userData.firstname,
            lastname: userData.lastname,
            profilePicture: userData.profilePicture,
            location: userData.location,
            userId: userData.userId,
            city: userData.city,
            friendrequestlenght: userData.friendRequest

        }));
    };



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const clearUser = () => {
        setUser({
            token: null,
            username: '',
            firstname: '',
            lastname: '',
            profilePicture: null,
            location: '',
            userId: '',
            city: '',
            friendrequestlenght: null

        });
        localStorage.removeItem('user');
    };

    return (
        <UserApi.Provider value={{ user, updateUser, clearUser, updateUserRegistration, updateProfilePicture }} >
            {children}
        </UserApi.Provider>
    );
};

export default UserProvider;
