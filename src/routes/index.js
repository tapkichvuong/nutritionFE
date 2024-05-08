import Home from '~/views/Home';
import Login from '~/views/Login';
import Register from '~/views/Register';
import PostDetail from '~/views/PostDetail';
import Following from '~/views/Following';
import Profile from '~/views/Profile';
import Upload from '~/views/Upload';
import EditPost from '~/views/EditPost';
import Search from '~/views/Search';
import Setting from '~/views/Setting';
import Unauthorized from '~/views/Unauthorized';
import { DefaultLayout, HeaderOnly } from '~/Layout';
import NotFound from '~/views/NotFound';
import RequireAuth from '~/components/RequireAuth';
import PostAdmin from '~/views/PostAdmin';
import Chatbot from '~/views/Chatbot';

const ROLES = {
    client: 'CLIENT',
    doctor: 'DOCTOR',
    seller: 'SELLER',
};

const publicRoutes = [
    {
        path: '/login',
        component: Login,
        layout: HeaderOnly,
    },
    {
        path: '/chatbot',
        component: Chatbot,
        layout: HeaderOnly,
    },
    {
        path: '/register',
        component: Register,
        layout: HeaderOnly,
    },
    {
        path: '/profile/:nickname',
        component: Profile,
    },
    {
        path: '/search',
        component: Search,
        layout: HeaderOnly,
    },

    {
        path: '/unauthorized',
        component: Unauthorized,
        layout: HeaderOnly,
    },
    {
        path: '*',
        component: NotFound,
        layout: HeaderOnly,
    },
];

const privateRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        title: 'post page',
        path: '/post/:id',
        component: PostDetail,
        auth: <RequireAuth allowedRoles={[ROLES.client, ROLES.seller, ROLES.doctor]} />,
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/post/upload',
        component: Upload,
        auth: <RequireAuth allowedRoles={[ROLES.doctor]} />,
        layout: HeaderOnly,
    },
    {
        path: '/post/:id/edit',
        component: EditPost,
        auth: <RequireAuth allowedRoles={[ROLES.doctor]} />,
        layout: HeaderOnly,
    },
    {
        path: '/myprofile',
        component: Profile,
        auth: <RequireAuth allowedRoles={[ROLES.client, ROLES.seller, ROLES.doctor]} />,
        layout: DefaultLayout,
    },
    {
        path: '/settings',
        component: Setting,
        auth: <RequireAuth allowedRoles={[ROLES.client, ROLES.seller, ROLES.doctor]} />,
        layout: DefaultLayout,
    },
    {
        path: '/profile/:nickname',
        component: Profile,
    },
    {
        path: '/post',
        component: PostAdmin,
        auth: <RequireAuth allowedRoles={[ROLES.client, ROLES.seller, ROLES.doctor]} />,
        layout: HeaderOnly,
    },
    {
        path: '/following',
        component: Following,
    },
];

export { publicRoutes, privateRoutes };
