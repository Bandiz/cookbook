import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    hover: {
        '&:hover': {
            filter: 'blur(4px)',
        },
    },
});
