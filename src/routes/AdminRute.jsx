import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from '../views/Admin/AdminLayout';
import Page404 from '../views/Page404';
import Dashboard from '../views/Admin/Dashboard';
import Post from '../views/Admin/Post';
import { AddEditPost, ListPost } from '../components/Admin/PostComp';
import Tache from '../views/Admin/Tache';
import { AddEditTache, ListTache } from '../components/Admin/TacheComp';

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
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                {/*----------- Post -----------*/}
                <Route path="/post" element={<Post />}>
                    <Route index element={<ListPost />} />
                    <Route path="/post/addEditPost" element={<AddEditPost />} />
                </Route>

                {/* ---------Tache---------- */}
                <Route path='/tache' element={<Tache/>}>
                    <Route index element={<ListTache />} />
                    <Route path="/tache/addEditTache" element={<AddEditTache />} />
                </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AdminRoute;
