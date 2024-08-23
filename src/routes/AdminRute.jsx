import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from '../views/Admin/AdminLayout';
import Page404 from '../views/Page404';
import Dashboard from '../views/Admin/Dashboard';
import Post from '../views/Admin/Post';
import { AddEditPost, ListPost } from '../components/Admin/PostComp';
import Tache from '../views/Admin/Tache';
import { AddEditTache, ListTache } from '../components/Admin/TacheComp';
import Messages from '../views/Admin/Messages';
import { AddMessage, ListMessage } from '../components/Admin/MessageComp';
import Profile from '../views/Admin/Profile';
import { AddEditProfile, GetProfile, ListAllProfile } from '../components/Admin/ProfileComp';
import { Settings } from '../views/Admin/Settings';

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
                {/* ---------Messages---------- */}
                <Route path='/messages' element={<Messages/>}>
                    <Route index element={<ListMessage />} />
                    <Route path="/messages/addEditMessage" element={<AddMessage />} />
                </Route>
                {/* ---------Profile---------- */}
                <Route path='/profile' element={<Profile/>}>
                    <Route index element={<GetProfile />} />
                    <Route path="/profile/addProfile" element={<AddEditProfile />} />
                </Route>

                <Route path="/settings" element={<Settings />} />

                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
};

export default AdminRoute;
