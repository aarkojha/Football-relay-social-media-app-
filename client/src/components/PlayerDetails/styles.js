import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    },
    card: {
        display: 'flex',
        width: '100%',
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
        minWidth: '450px',
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
            width: '100%'
        },
    },
    imageSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPlayers: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh', background: '#121212'
    },
    commentsOuterContainer: {
        display: 'flex', flexDirection: 'column'
    },
    commentsInnerContainer: {
        maxHeight: '350px', overflowY: 'auto', background: '#121212', marginBottom: '20px', padding: '15px', 
    },
}));