import React from 'react';
import { Button } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { useRecordContext } from 'react-admin';
import EditIcon from '@mui/icons-material/Edit';
const EditButton = ({ source }) => {
    const history = useNavigate();
    const record = useRecordContext();
    const handleEdit = () => {
        console.log(record[source]);
        history(`${record[source]}/edit`);
    };

    return record ? (
        <Button label="Edit" onClick={handleEdit}>
            <EditIcon />
        </Button>
    ) : null;
};

export default EditButton;
