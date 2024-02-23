import PostOptions from '../PostOptions/PostOptions';
import './post.scss';
import { useState, useEffect } from 'react';
import Share from '../Share/Share';
import axios from 'axios';
import UserApi from '../../Store/User/UserApi';
import React, { useContext } from "react";
import PostApi from '../../Store/Post/PostApi';

export default function Posts({ isUserProfile, userPost, showUserPosts, userId }) {
    const [posts, setPosts] = useState([]);

    const { user } = useContext(UserApi);

    const { token } = user;
    const { postInfo } = useContext(PostApi);
    const { postId } = postInfo;



    const config = {
        headers: {
            Authorization: `Bearer ${token}`

        }

    };

    const fetchPosts = async () => {
        try {
            let apiUrl = "https://localhost:8443/api/post/getAll";

            if (showUserPosts) {
                apiUrl = `https://localhost:8443/api/post/getUserPosts/${userId}`;
            }

            const response = await axios.get(apiUrl, config);


            const postsWithDecodedImages = response.data.map(post => {
                const decodedImage = atob(post.file);
                const arrayBuffer = new ArrayBuffer(decodedImage.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < decodedImage.length; i++) {
                    uint8Array[i] = decodedImage.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
                const imageUrl = URL.createObjectURL(blob);
                return { ...post, imageUrl };
            });
            setPosts(postsWithDecodedImages.reverse());
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleShare = (createPost) => {
        if (createPost) {

            const postIds = postId;
            const newPost = { ...createPost, id: postIds, };


            setPosts([newPost, ...posts]);

        } else {
            console.error("Title is missing in createPostData:", createPost);
        }
        fetchPosts();
    };

    const handleDelete = async (postIdToDelete) => {
        try {

            await axios.delete(`https://localhost:8443/api/post/${postIdToDelete}`, config);

            const updatedPosts = posts.filter((post) => post.id !== postIdToDelete);
            setPosts(updatedPosts);

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className='posts'>
            <Share onShare={handleShare} />
            {posts

                .map(post => (
                    <PostOptions post={post} key={post.id} onDelete={handleDelete} postId={post.id} />

                ))}

        </div>
    );
}
