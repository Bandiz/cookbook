import { MouseEventHandler } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ArrowProps {
    direction: string;
    clickFunction: MouseEventHandler<HTMLDivElement>;
}
export function Arrow({ direction, clickFunction }: ArrowProps) {
    const icon = direction === 'left' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />;

    return (
        <div style={{ cursor: 'pointer', height: '30px' }} onClick={clickFunction}>
            {icon}
        </div>
    );
}
