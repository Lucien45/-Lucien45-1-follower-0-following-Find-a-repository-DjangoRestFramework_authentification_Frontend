import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserService } from '../../_services/User.service';
import { Utils } from '../../_utils/utils';
import '../../assets/admin/profile.css'

const Profile = () => {
    const [status, setStatus] = useState();

    useEffect(() => {
        UserService.getUser()
            .then((res) => {
                console.log(res.data.user);
                if (res.data.user.is_admin) {
                    setStatus('Administrateur');
                } else {
                    setStatus('Staff');
                }
            })
            .catch((error) => {
                Utils.errorPage(error.response.data.message);
            });
    }, []);

    return (
        <div className=''>
            <div className="navbarPage">
                <div className='titre-page' >Profile</div>
                {status === 'Administrateur' && (
                    <div><button className='button is-success' id='btnAdd'><Link to={`/admin/profile/addProfile`}>Nouveau Profile</Link></button></div>
                )}
            </div>
            <div className='outlet-page' id='list-content'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Profile