import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Messages = () => {
  return (
    <div className=''>
        <div className="navbarPage">
            <div className='titre-page' >Messages</div>
            <div><button className='button is-success' id='btnAdd'><Link to={`/admin/messages/addEditMessage`}>Nouveau Message</Link></button></div>
        </div>
        <div className='outlet-page' id='list-content'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Messages