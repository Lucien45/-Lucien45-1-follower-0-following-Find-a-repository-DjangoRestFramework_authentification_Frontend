import Cookies from 'js-cookie';
import Axios from './Axios';

// Service Posts
let getAllPosts = () => {
    return Axios.get(`/api/blog/posts/`);
}

let createPost = (data) => {
    return Axios.post("/api/blog/posts/", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken'),
        }
    });
}

export const PostService = {
    getAllPosts, createPost
} 
