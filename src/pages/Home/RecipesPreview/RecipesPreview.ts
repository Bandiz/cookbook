import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    list: {
        padding: '20px 0',
        maxWidth: '700px',
        margin: '0 auto',
    },
    image: {
        '&:hover': {
            filter: 'blur(4px)',
        },
    },
});
