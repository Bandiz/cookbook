import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    image: {
        maxWidth: '500px',
        width: '100%',
        height: 'auto',
        margin: '20px auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
});
