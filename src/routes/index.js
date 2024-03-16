import Home from '~/views/Home';
import Login from '~/views/Login';
import Register from '~/views/Register';
import PostDetail from '~/views/PostDetail';
import Following from '~/views/Following';
import Profile from '~/views/Profile';
import Upload from '~/views/Upload';
import Search from '~/views/Search';
import Unauthorized from '~/views/Unauthorized';
import { HeaderOnly } from '~/Layout';
import NotFound from '~/views/NotFound';
import RequireAuth from '~/components/RequireAuth';

const ROLES = {
    client: 'CLIENT',
    doctor: 'DOCTOR',
    seller: 'SELLER',
};

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
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
        path: '/post/:id',
        component: PostDetail,
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
        path: '/upload',
        component: Upload,
        auth: RequireAuth,
        layout: HeaderOnly,
    },
    {
        path: '/following',
        component: Following,
    },
];

export { publicRoutes, privateRoutes };
