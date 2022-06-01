import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    card: {
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        display: 'block',
        overflow: 'hidden',
        width: '100%',
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
    },
});
