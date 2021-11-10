import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material//Search';

import './Search.scss';

export default function Search() {
    return (
        <div className="search">
            <div className="search-icon">
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: 'inputRoot',
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
}
