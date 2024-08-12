import Axios from "./Axios";

// Service Posts
let getAllPosts = () => {
    return Axios.get(`/api/blog/posts/`);
}

let createPost = (data) => {
    return Axios.post("/api/blog/posts/", data);
}

export const PostService = {
    getAllPosts, createPost
} 
