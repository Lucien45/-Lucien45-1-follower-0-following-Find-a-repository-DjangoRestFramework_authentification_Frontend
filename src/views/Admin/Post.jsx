import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Post = () => {
    return (
        <div className=''>
            <div className="navbarPage">
                <div className='titre-page' >Posts</div>
                <div><button className='button is-success' id='btnAdd'><Link to={`/admin/post/addEditPost`}>Nouveau Post</Link></button></div>
            </div>
            <div className='outlet-page' id='list-content'>
                <Outlet/>
            </div>
        </div>
    );
};

export default Post;