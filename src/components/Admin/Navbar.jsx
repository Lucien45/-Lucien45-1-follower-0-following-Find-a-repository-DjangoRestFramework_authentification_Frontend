import { useState, useEffect } from 'react';
import { FaCaretDown, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserService } from '../../_services/User.service';
import { UserProfilePopup } from './UserProfilePopup';
import { useTheme } from '../other/ThemeContext';
import Swal from 'sweetalert2';
import { Utils } from '../../_utils/utils';

export const Navbar = () => {
    const [dataUser, setDataUser] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const { theme, toggleTheme } = useTheme();

    function submitLogout() {
        setLoading(true); // Set loading state to true
        Swal.fire({
            title: `Êtes-vous sûr de vouloir déconnecter?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Déconnecter`,
            denyButtonText: "Annuler",
            allowEscapeKey: false,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                var credential = {
                    withCredentials: true,
                };
                UserService.SignOut(credential)
                    .then((res) => {
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        Utils.errorPage(error.response?.data?.message || 'An error occurred during logout');
                    })
                    .finally(() => {
                        setLoading(false); // Reset loading state
                    });
            } else {
                setLoading(false); // Reset loading state if canceled
            }
        });
    }

    useEffect(() => {
        UserService.getUser()
            .then(function (res) {
                setDataUser(res.data.user);
                console.log(res.data);
            })
            .catch(function (error) {
                window.location.href = '/'
                Utils.errorPage(error.response.data.message);
            });
    }, []);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className='navbar-education'>
            <div className='icon-navbar'>
                <button onClick={toggleTheme} className='theme-toggle'>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
            </div>
            <div className='info-user' onClick={togglePopup}>
                <div className='profile-image'>
                    <img src='../media/user.png' alt='profile' />
                </div>
                <div className='profile-info'>
                    <span><i><FaCaretDown /></i></span>
                </div>
                {isPopupVisible && <UserProfilePopup dataUser={dataUser} onLogout={submitLogout} loading={loading} />}
            </div>
        </div>
    );
};
