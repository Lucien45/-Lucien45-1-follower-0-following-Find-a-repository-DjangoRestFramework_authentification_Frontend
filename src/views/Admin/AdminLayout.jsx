import { Navbar } from '../../components/Admin/Navbar';
import { Outlet } from 'react-router-dom';
import Sidbar from '../../components/Admin/Sidbar';
import { useTheme } from '../../components/other/ThemeContext';
import { useEffect } from 'react';

const AdminLayout = () => {
    const { theme } = useTheme();
    useEffect(() => {
        document.body.className = theme; // Appliquer le thème au corps
    }, [theme]);
    return (
        <div className='adminPage'>
            <div className='sidebar_admin' id='sidebarFront'>
                <Sidbar />
            </div>
            <div className='contentPageAdmin'>
                <div className='navbar_admin'>
                    <Navbar />
                </div>
                <div className={`borderContenuAdmin ${theme}`}>
                    <div className='contenuAdmin'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
