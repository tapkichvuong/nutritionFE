import Home from '~/views/Home';
import Login from '~/views/Login';
import Register from '~/views/Register';
import PostDetail from '~/views/PostDetail';
import Following from '~/views/Following';
import Profile from '~/views/Profile';
import Upload from '~/views/Upload';
import Search from '~/views/Search';
import { HeaderOnly } from '~/Layout';
import NotFound from '~/views/NotFound';
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
        path: '/following',
        component: Following,
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
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
        layout: HeaderOnly,
    },
    {
        path: '*',
        component: NotFound,
        layout: HeaderOnly,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
