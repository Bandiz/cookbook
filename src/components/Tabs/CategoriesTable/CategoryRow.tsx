import { ChangeEvent, ReactNode, useState } from 'react';
import {
    Box,
    Checkbox,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Category } from '../../../types';

interface CategoryRowProps {
    category: Category;
    disabled: boolean;
}

export function CategoryRow({ category, disabled }: CategoryRowProps) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [visible, setVisible] = useState(category.visible);

    function handleOnVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
        setVisible(event.target.checked);
    }

    let tableCells: ReactNode[];

    if (!editMode) {
        tableCells = [
            <TableCell key={0}>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>,
            <TableCell key={1} component="th" scope="row">
                {category.categoryName}
            </TableCell>,
            <TableCell key={2} component="th" scope="row">
                <Checkbox checked={category.visible} disabled inputProps={{ 'aria-label': 'is menu visible' }} />
            </TableCell>,
            <TableCell key={3} component="th" scope="row">
                <Tooltip title={category.createdAt.format('YYYY-DD-MM HH:mm')} arrow>
                    <span>{category.createdBy}</span>
                </Tooltip>
            </TableCell>,
            <TableCell key={4} component="th" scope="row">
                <Tooltip title={category.updatedAt.format('YYYY-DD-MM HH:mm')} arrow>
                    <span>{category.updatedBy}</span>
                </Tooltip>
            </TableCell>,
            <TableCell key={5} align="right">
                <Tooltip title="Edit">
                    <span>
                        <IconButton disabled={disabled} onClick={() => setEditMode(true)}>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Delete">
                    <span>
                        <IconButton disabled={disabled}>
                            <DeleteIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </TableCell>,
        ];
    } else {
        tableCells = [
            <TableCell key={0} colSpan={2} component="th" scope="row">
                {category.categoryName}
            </TableCell>,
            <TableCell key={1} colSpan={3} component="th" scope="row">
                <Checkbox
                    checked={visible}
                    onChange={handleOnVisibilityChange}
                    inputProps={{ 'aria-label': 'is menu visible' }}
                />
            </TableCell>,
            <TableCell key={2} align="right">
                <Tooltip title="Save">
                    <span>
                        <IconButton disabled={disabled} onClick={() => setEditMode(false)}>
                            <SaveIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Cancel">
                    <span>
                        <IconButton disabled={disabled} onClick={() => setEditMode(false)}>
                            <CancelIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </TableCell>,
        ];
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>{tableCells}</TableRow>
            {/* <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>TODO: RECIPE LIST HERE</TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow> */}
        </>
    );
}
