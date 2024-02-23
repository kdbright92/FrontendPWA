import './leftBar.scss'
import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
} from "@mui/icons-material";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"; import UserApi from "../../Store/User/UserApi";

export default function LeftBar() {

    const { updateUser, user: { firstname, profilePicture, userId } } = useContext(UserApi);



    return (
        <div className='leftBar'>
            <div className="container">
                <List>

                    <ListItem disablePadding>
                        <ListItemButton  >

                            <ListItemIcon >
                                <Link to="/home">
                                    <Home />
                                </Link>
                            </ListItemIcon>

                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon>
                                <Link to={`/profile/${userId}`}>

                                    <AccountBox />
                                </Link>
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Article />
                            </ListItemIcon>
                            <ListItemText primary="Pages" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Link to={'/rightBar'}>

                                    <Person />
                                </Link>
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Link to={'/accountSettings'}>
                                    <Settings />
                                </Link>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>

                            </ListItemIcon>

                        </ListItemButton>
                    </ListItem>
                </List>
            </div>



        </div >
    )
}
