import Home from '~/views/Home';
import Following from '~/views/Following';
import Profile from '~/views/Profile';
import Upload from '~/views/Upload';
import Search from '~/views/Search';
import { HeaderOnly } from '~/Layout';
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/following',
        component: Following,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/upload',
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: '/search',
        component: Search,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
