import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        height: 200
    },
    border: {
        border: 'solid'
    },
    fullHeightCard: {
        height: '100%'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid #181818',
        background: '#121212',
        color: '#404040',
        borderRadius: '15px'
    },
    activeCard: {
        borderBottom: '10px solid #22289a'
    },
    grid: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    title: {
        padding: '0 16px',
        color: '#B3B3B3'
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    }
});