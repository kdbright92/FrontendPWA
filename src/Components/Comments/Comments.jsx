import React, { useState, useEffect } from 'react';
import './comments.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import UserApi from '../../Store/User/UserApi';
import { useContext } from "react";
import axios from 'axios';
import { Podcasts } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import PostApi from '../../Store/Post/PostApi';


export default function Comments({ comments, setComments, onDeleteComment, counthandler, postId }) {
    const [commentInput, setCommentInput] = useState('');
    const [commentCount, setCommentCount] = useState(0); // New state for comment count
    const [editingCommentId, setEditingCommentId] = useState(null);
    const { user } = useContext(UserApi);
    const { postInfo } = useContext(PostApi);
    const [commentsTemp, setCommentsTemp] = useState([]);


    const { firstname, token, profilePicture } = user;

    const handleSend = () => {



        if (commentInput.trim() !== '') {
            const newComment = {
                text: commentInput,
                // Add other properties like user and post if needed
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${token}` // Set your token format here (e.g., Bearer)

                }
            }


            axios.post(`https://localhost:8443/api/comment/create/${(postId)}`, newComment, config)
                .then((response) => {

                    setCommentsTemp([response.data, ...commentsTemp]);

                    setCommentInput('');
                    setCommentCount(commentCount + 1);
                    counthandler(commentCount);
                })
                .catch((error) => {
                    console.error("Error creating comment:", error);
                    // Add logic to handle or display the error
                });


        }
    };


    const handleDeleteComment = async (commentId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Set your token format here (e.g., Bearer)

            }
        };

        try {
            await axios.delete(`https://localhost:8443/api/comment/${commentId}`, config);

            const updatedComments = comments.filter((comment) => comment.id !== commentId);
            onDeleteComment(commentId);
            setCommentCount(commentCount - 1);
            setComments(updatedComments);


        } catch (error) {
            console.error('Error deleting post:', error);

        }
    };

    const handleUpdateComment = (updatedText, commentId) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, text: updatedText };
            }
            return comment;
        });
        setComments(updatedComments);
        setEditingCommentId(null); // Reset editing comment ID after update
    };
    const handleEditComment = (commentId) => {
        setEditingCommentId(commentId); // Set the currently editing comment ID
    };
    const handleKeyDown = (e, commentId) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior of textarea on Enter key
            const updatedText = e.target.value;
            handleUpdateComment(updatedText, commentId);
        }
    };

    useEffect(() => {
        setCommentsTemp(comments);
    }, []);



    return (
        <div className="comments">
            <div className="write">
                <input
                    type="text"
                    placeholder="Write a comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
            {commentsTemp.map((comment) => (
                <div className="comment" key={comment.id}>
                    <div className="info">
                        <span>{comment.name}</span>
                        <Avatar sx={{ width: 100, height: 100 }} alt="Profile Picture" src={`data:image/png;base64, ${profilePicture}`} />

                    </div>
                    <div className="commentText">
                        {editingCommentId === comment.id ? (
                            <textarea
                                defaultValue={comment.text}
                                onKeyDown={(e) => handleKeyDown(e, comment.id)}
                            />
                        ) : (
                            <p>{comment.text}</p>
                        )}
                    </div>
                    <span className="date">1 min ago</span>
                    <div className="icon">
                        <DeleteIcon onClick={() => handleDeleteComment(comment.id)} />
                        <SettingsSuggestIcon onClick={() => handleEditComment(comment.id)} />
                    </div>



                </div>
            ))}
        </div>
    );
}


