import './App.css';
import { createBrowserRouter, RouterProvider, navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/login/Login';
import { useLocation } from 'react-router-dom';
import Register from './Pages/register/Register';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import TopBar from './Components/TopBar/TopBar';
import LeftBar from './Components/LeftBar/LeftBar';
import RightBar from './Components/RightBar/RightBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import UserProvider from './Store/User/UserProvider';
import PostProvider from './Store/Post/PostProvider';
import UserFriendList from './Pages/profile/UserFriendList';
import Friends from './Components/Friends/Friends';
import CustomTabPanel from './Pages/Account Settings/CustomTabPanel'

function App() {

  const Layout = () => {
    const location = useLocation();
    const isFriendsPage = location.pathname.startsWith('/friends/');


    return (
      <div>
        <TopBar />
        <div style={{ display: "flex" }}>
          {location.pathname.startsWith('/rightBar') ? (
            <RightBar />
          ) : (
            <>
              {!location.pathname.startsWith('/profile/') && <LeftBar />}
              {location.pathname.startsWith('/accountSettings') && <CustomTabPanel />}
              <div style={{ flex: 2 }}>
                {!isFriendsPage && !location.pathname.startsWith('/profile/') && !location.pathname.startsWith('/accountSettings') && <Home />}
                {isFriendsPage ? <Friends /> : null}
                {location.pathname.startsWith('/profile/') && <Profile />}
              </div>
              {!location.pathname.startsWith('/profile/') && !location.pathname.startsWith('/accountSettings') && <RightBar />}
            </>
          )}
        </div>
      </div>
    );
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Layout />,

      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/rightBar",
          element: <RightBar />
        },
        {
          path: "/friends/:id",
          element: <Friends />,
        },
        {
          path: "/accountSettings",
          element: <CustomTabPanel />
        },

        {
          path: "/profile/:id",
          element: <Profile />,
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

  ]);

  return (
    <div>
      <UserProvider>
        <PostProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
