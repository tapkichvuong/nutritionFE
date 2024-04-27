import { List, Datagrid, TextField } from 'react-admin';
import EditButton from './EditButton';
export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="title" />
            <TextField source="category" />
            <EditButton source="id" />
        </Datagrid>
    </List>
);
