import React, { useState, createContext, useContext } from "react";
import PostApi from "./PostApi";



export const PostProvider = ({ children }) => {
    const [postInfo, setPostInfo] = useState({
        postId: "",
        userId: ""



    });

    const updatePost = (newPostInfo) => {
        setPostInfo(
            {
                postId: newPostInfo.postId,
                userId: newPostInfo.userId

            }
        )


    };

    const clearPost = () => {
        setPostInfo({
            postId: null,
            commentId: null,
            userId: null,
        });
    };

    return (
        <PostApi.Provider value={{ postInfo, updatePost, clearPost }}>
            {children}
        </PostApi.Provider>
    );
};

export default PostProvider;
