import { ListItemSecondaryAction } from '@mui/material';

import DeleteItem from './DeleteItem';
import EditItem from './EditItem';

export default function ListItems() {
    return (
        <ListItemSecondaryAction>
            <EditItem />
            <DeleteItem />
        </ListItemSecondaryAction>
    );
}
