import Home from '~/views/Home';
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
        path: '/following',
        component: Following,
    },
    {
        path: '/profile/:nickname',
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
    {
        path: '*',
        component: NotFound,
        layout: HeaderOnly
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
