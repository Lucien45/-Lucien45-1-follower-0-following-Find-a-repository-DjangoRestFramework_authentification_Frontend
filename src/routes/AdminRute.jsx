import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from '../views/Admin/AdminLayout';
import Page404 from '../views/Page404';
import Dashboard from '../views/Admin/Dashboard';

const AdminRoute = ({ setLoading }) => {
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const handleComplete = () => {
            setLoading(false);
        };

        const timeout = setTimeout(handleComplete, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [location, setLoading]);
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='*' element={<Page404/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRoute;