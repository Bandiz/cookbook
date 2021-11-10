import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type EditProps = {
    handleEdit?: (event: any) => void;
};

export default function EditItem({ handleEdit }: EditProps) {
    return (
        <IconButton aria-label="edit" onClick={handleEdit}>
            <Tooltip title="Edit">
                <EditIcon />
            </Tooltip>
        </IconButton>
    );
}
