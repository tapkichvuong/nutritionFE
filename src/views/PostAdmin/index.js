import { Admin, Resource, PostEdit } from 'react-admin';
import { useDataProvider } from '~/hooks/useDataProvider';
import { PostList } from './posts';
import PostIcon from "@mui/icons-material/Book";
const PostAdmin = () => {
    const dataProvider = useDataProvider();
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="mypost" list={PostList} icon={PostIcon}/>
        </Admin>
    );
};

export default PostAdmin;
