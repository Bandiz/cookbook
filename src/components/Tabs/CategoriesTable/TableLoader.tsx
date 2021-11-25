import { LinearProgress, TableCell, TableRow } from '@mui/material';

interface TableLoaderProps {
    loading: boolean;
    colSpan?: number;
}

export function TableLoader({ loading, colSpan }: TableLoaderProps) {
    if (!loading) {
        return null;
    }

    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                sx={{
                    p: 0,
                }}
            >
                <LinearProgress />
            </TableCell>
        </TableRow>
    );
}
