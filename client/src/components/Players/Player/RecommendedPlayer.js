import React, { useState } from 'react'
import { Card, CardActions, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePlayer, likePlayer } from '../../../actions/players'
import useStyles from './styles'
import { useHistory } from 'react-router-dom'

const RecommendedPlayer = ({ player }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    const [likes, setLikes] = useState(player?.likes)

    const userId = (user?.result?.googleId || user?.result?._id)
    const hasLikedPlayer = player.likes.find((like) => like === userId)

    const handleLike = async () => {
        dispatch(likePlayer(player._id))

        if (hasLikedPlayer) {
            setLikes(player.likes.filter((id) => id !== userId))
        } else {
            setLikes([...player.likes, userId])
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${player.likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{player.likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    const openPlayer = () => {
        history.push(`/players/${player._id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <div className={classes.cardAction} onClick={openPlayer} >
                <CardMedia className={classes.media} image={player.selectedFile} title={player.player_name} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{player.player_name}</Typography>
                </div>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" style={{ color: '#B3B3B3' }}>{player.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h6" gutterBottom>Created by: {player.name}</Typography>
            <Typography className={classes.title} variant="body2" gutterBottom>{moment(player.createdAt).fromNow()}</Typography>
            <CardActions className={classes.cardActions}>
                <Button size="small" style={{ color: '#B3B3B3' }} disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === player?.creator || user?.result?._id === player?.creator) && (
                    <Button size="small" style={{ color: '#B3B3B3' }} onClick={() => { dispatch(deletePlayer(player._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default RecommendedPlayer
