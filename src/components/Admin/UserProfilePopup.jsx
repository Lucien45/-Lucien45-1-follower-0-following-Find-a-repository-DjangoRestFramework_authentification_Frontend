import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaInbox, FaSignOutAlt } from 'react-icons/fa';
import '../../assets/UserProfilePopup.css'

export const UserProfilePopup = ({ dataUser, onLogout, loading }) => {
    const [status, setStatus] = useState();

    useEffect(() => {
        if (dataUser.is_admin === true) {
            setStatus('Administrateur');
        } else {
            setStatus('Staff');
        }
    }, [dataUser]);

    return (
        <div className="user-profile-popup">
            <div className="user-info">
                <div className="user-details">
                    <h4>{dataUser.username} 👋</h4>
                    <p>{status}</p>
                </div>
            </div>
            <hr className="separator" />
            <ul className="user-actions">
                <li>
                    <Link to="#">
                        <FaUser /> Profile
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <FaInbox /> Inbox
                    </Link>
                </li>
                <li>
                    <button onClick={onLogout} disabled={loading}>
                        {loading ? (
                            <span>Loading...</span> // Display loading text or spinner
                        ) : (
                            <>
                                <FaSignOutAlt /> Log Out
                            </>
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};