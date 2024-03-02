import Home from '~/components/views/Home';
import Following from '~/components/views/Following';
import Profile from '~/components/views/Profile';
import Upload from '~/components/views/Upload';
import Search from '~/components/views/Search';
import { HeaderOnly } from '~/components/Layout';
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
