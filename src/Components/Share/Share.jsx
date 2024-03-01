import './share.scss'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Fab, Tooltip } from '@mui/material';
import axios from 'axios';
import {
    Avatar,
    Button,
    ButtonGroup,
    Modal,
    Stack,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import {

    EmojiEmotions,
    Image,
    PersonAdd,
    VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import PostApi from '../../Store/Post/PostApi';
import React, { useContext } from "react";
import UserApi from "../../Store/User/UserApi";
import { toast } from 'react-toastify';




export default function Share({ onShare }) {
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showDoneIcon, setShowDoneIcon] = useState(false);

    const { user } = useContext(UserApi);

    const { firstname, lastname, token } = user;
    const { updatePost } = useContext(PostApi);
    const { user: { profilePicture } } = useContext(UserApi);


    const showSuccessNotification = () => {
        toast.success('Succesfull Post', {
            position: toast.POSITION.TOP_CENTER
        });
    };



    const SytledModal = styled(Modal)({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    });

    const UserBox = styled(Box)({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    });

    const handleSuccessfulUpload = () => {
        setUploadSuccess(true);
        setShowDoneIcon(true);
        setTimeout(() => {
            setUploadSuccess(false);
            setShowDoneIcon(false);
        }, 10000);
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFile(reader.result.split(',')[1]);
                    handleSuccessfulUpload();
                };
                reader.readAsDataURL(file);
            } else {
                console.error('Invalid file type. Please select an image.');
            }
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "https://localhost:8443/api/post/create";

        const createPost = {
            title,
            selectedFile
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post(url, createPost, config);

            const postId = response.data.id;
            const userId = response.data.user.id;

            updatePost({ postId, userId });

            onShare(createPost);

        } catch (error) {
            console.error("Error creating post:", error);

            // Save the post to localStorage for offline submission
            /* saveOfflinePost(createPost); */
        }

        setTitle('');
        setSelectedFile(null);
        setTimeout(() => {
            setOpen(false);
        }, 1000);
        showSuccessNotification();
    };

    // Function to save offline posts to localStorage
    /*  const saveOfflinePost = async (post) => {
         console.log("Successfully saved to IndexedDB");
 
         try {
             const db = await openDB();
             const transaction = db.transaction(STORE_NAME, 'readwrite');
             const store = transaction.objectStore(STORE_NAME);
 
             // Add the post data to the IndexedDB store
             const request = store.add(post);
 
             request.onerror = (event) => {
                 console.error('Error saving post to IndexedDB:', event.target.error);
             };
 
             request.onsuccess = (event) => {
                 console.log('Post saved to IndexedDB:', event.target.result);
             };
         } catch (error) {
             console.error('Error opening IndexedDB:', error);
         }
     }; */


    return (
        <div >

            <Tooltip

                title="Create Post"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="add" onClick={(e) => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <SytledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box
                    width={400}
                    height={280}
                    bgcolor={"white"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create post
                    </Typography>
                    <UserBox>
                        <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" src={`data:image/png;base64, ${profilePicture}`} />

                        <Typography fontWeight={500} variant="span">
                            {firstname} {lastname}
                        </Typography>
                    </UserBox>

                    <TextField

                        type='text'
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        multiline
                        required
                        fullWidth
                        rows={3}
                        placeholder="What's on your mind?"
                        variant="standard"
                        value={title}
                        autoFocus
                        onChange={e => setTitle(e.target.value)}




                    />

                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <EmojiEmotions color="primary" />
                        <label htmlFor="fileInput">
                            {showDoneIcon ? (
                                <DoneIcon />
                            ) : (
                                <Image color="secondary" />)}
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />


                        <VideoCameraBack color="success" />
                        <PersonAdd color="error" onClick={() => setOpen(true)} />

                    </Stack>
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={handleSubmit}

                        >Post</Button>

                    </ButtonGroup>
                </Box>
            </SytledModal>


        </div >
    )
}
