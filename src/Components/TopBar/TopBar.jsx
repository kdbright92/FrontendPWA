/* import './topBar.scss'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import UserApi from "../../Store/User/UserApi";
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

    ListItemButton,
    ListItemIcon,

    Switch,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import { useLocation } from 'react-router-dom';



export default function TopBar({ }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showForumDrawer, setShowForumDrawer] = useState(false);
    const [showUserSettings, setShowUserSettings] = useState(false);
    const navigate = useNavigate();
    const { clearUser, user } = useContext(UserApi);
    const { friendrequestlenght } = user;
    const location = useLocation();
    const { updateUser, user: { firstname, profilePicture, userId } } = useContext(UserApi);




    const showSuccessNotification = () => {
        toast.success('Logout successful!', {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('accessToken'); // Clear any token or user data in local storage

        // Update the UserProvider context (set the user to null or default value)
        clearUser(); // Assuming setUser is a function from your UserProvider

        // Redirect to the login page after logout
        showSuccessNotification();
        navigate('/register');
    };



    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };



    const toggleForumDrawer = () => {
        setShowForumDrawer(!showForumDrawer);
    };


    return (
        <div className='topBar'>
            <div className='left'>
                <Link to="/">
                    <div className="home">
                        <span>Master</span>
                    </div>


                </Link>

                <div className="hamburger" onClick={toggleMenu}>
                    <MenuRoundedIcon />
                </div>
                <p>Hey {firstname}</p>




                <div className="search">
                    <SearchIcon />
                    <input type='text' placeholder='Search...' />
                </div>

                <Drawer anchor="left" open={showMenu} onClose={toggleMenu}>
                    <div role="presentation" onClick={toggleMenu} onKeyDown={toggleMenu}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="http://localhost:3000/">
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Homepage" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/profile">
                                    <ListItemIcon>
                                        <AccountBox />
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
                                        <Storefront />
                                    </ListItemIcon>
                                    <ListItemText primary="Marketplace" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" >
                                    <ListItemIcon>
                                        <Link to={`/friends/${userId}`}>
                                            <Person />
                                        </Link>
                                    </ListItemIcon>
                                    <ListItemText primary="Friends" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemIcon>


                                    </ListItemIcon>

                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="/profile">
                                    <ListItemIcon>
                                        <AccountBox />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
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
                </Drawer>


            </div>
            <div className='right'>

                <Link to={`/profile/${userId}`}>
                    <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" src={`data:image/png;base64, ${profilePicture}`} />

                </Link>

                <div className='friends'>
                    <Link to={`/friends/${userId}`}>
                        <GroupIcon sx={{ width: 35, height: 35 }} />

                    </Link>
                    <div className='counter' >
                        {friendrequestlenght}
                    </div>
                </div>


                <div className="logout" onClick={handleLogout}>
                    <Link to="/register">
                        <LogoutIcon />
                    </Link>
                </div>


            </div>
        </div>
    )
}


 */


import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import UserApi from "../../Store/User/UserApi";
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


    ListItemButton,
    ListItemIcon,

    Switch,
} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showForumDrawer, setShowForumDrawer] = useState(false);
    const [showUserSettings, setShowUserSettings] = useState(false);
    const navigate = useNavigate();
    const { clearUser, user } = useContext(UserApi);
    const { friendrequestlenght, token } = user;
    const location = useLocation();
    const { updateUser, user: { firstname, profilePicture, userId } } = useContext(UserApi);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [users, setUsers] = useState('');

    const showSuccessNotification = () => {
        toast.success('Logout successful!', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const navigatetoProfile = () => {
        setAnchorEl(null);
        navigate(`/profile/${userId}`);
        handleMobileMenuClose();

    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const logout = () => {
        localStorage.removeItem('accessToken'); // Clear any token or user data in local storage

        // Update the UserProvider context (set the user to null or default value)
        clearUser(); // Assuming setUser is a function from your UserProvider

        // Redirect to the login page after logout
        showSuccessNotification();
        navigate('/register');

    }

    const openFriendRequest = () => {
        console.log("hello")
        navigate('/rightBar')

    }
    const goToHome = () => {
        navigate('/home');

    }

    const searchUser = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get('https://localhost:8443/api/profile/getAllProfiles', config);
            console.log(response.data)
            setUsers(response.data)


        } catch (error) {
            console.error('Error sending Request:', error);
        }
    };
    const accountSettings = () => {
        navigate('/accountSettings')
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={navigatetoProfile}>Profile</MenuItem>
            <MenuItem onClick={accountSettings}>Account Settings</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',

            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={friendrequestlenght} color="error">

                        <GroupIcon onClick={openFriendRequest} />
                    </Badge>
                </IconButton>
                <p>Friends</p>
            </MenuItem>
            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <ManageAccountsIcon onClick={accountSettings} />
                </IconButton>
                <p>Account Settings</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar sx={{ width: 40, height: 40 }} alt="Profile Picture" src={`data:image/png;base64, ${profilePicture}`} />

                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon onClick={goToHome} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <p>Hey {firstname}</p>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onClick={searchUser}


                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={friendrequestlenght} color="error">

                                <GroupIcon onClick={openFriendRequest} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar sx={{ width: 40, height: 40 }} alt="Profile Picture" src={`data:image/png;base64, ${profilePicture}`} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}