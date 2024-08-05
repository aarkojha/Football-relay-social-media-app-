import React, { useState, useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'

import RecommendedPlayer from '../Players/Player/RecommendedPlayer'
import CommentSection from './CommentSection'
import NewsCards from '../NewsCards/NewsCards'
import { getPlayer, getPlayersBySearch } from '../../actions/players'
import useStyles from './styles'

const PlayerDetails = () => {
    const { player, players, isLoading } = useSelector(state => state.players)
    const dispatch = useDispatch()
    const classes = useStyles()
    const { id } = useParams()
    const [recommendedPlayers, setRecommendedPlayers] = useState([])
    
    useEffect(() => {
        dispatch(getPlayer(id))
    }, [id])
    
    useEffect(() => {
        if (players && player) {
            setRecommendedPlayers(players.filter(({ _id }) => _id !== player._id).sort(() => 0.5 - Math.random()).slice(0, 4))
        }
    }, [players, player])
    
    useEffect(() => {
        if (player) {
            dispatch(getPlayersBySearch({ search: 'none', tags: player?.tags.join(',') }))
        }
    }, [player])

    if (!player) return null

    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '20px', width: '90%', marginLeft: 'auto', marginRight: 'auto', background: 'rgba(18,18,18, 0.9)', color: 'white' }} elevation={6}>
            <div className={classes.imageSection}>
                <img className={classes.media} src={player.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={player.player_name} />
            </div>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{player.player_name}</Typography>
                    <Typography gutterBottom variant="h6" style={{ color: '#404040' }} component="h2">{player.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography variant="body1">Created by: {player.name}</Typography>
                    <Typography variant="body2">{moment(player.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0', background: '#404040' }} />
                    <Typography gutterBottom variant="body1" component="p" style={{ color: '#B3B3B3' }}>{player.description}</Typography>
                    <Divider style={{ margin: '20px 0', background: '#404040' }} />
                </div>
            </div>
            <CommentSection player={player} />
            <Divider style={{ margin: '20px 0', background: '#404040' }} />

            {player.articles ? (
                <>
                <Typography gutterBottom variant="h5">News from {player.player_name}</Typography>
                <Divider style={{ margin: '20px 0', background: '#404040' }} />
                </>
            ) : null}
            <NewsCards articles={player.articles} />

            
            {recommendedPlayers.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <Grid container align="stretch" spacing={1} className={classes.recommendedPlayers}>
                        {recommendedPlayers.map((player) => (
                            <Grid key={player._id} item xs={12} sm={6} md={4} lg={3}>
                                <RecommendedPlayer key={player._id} player={player} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </Paper>
    )
}

export default PlayerDetails
