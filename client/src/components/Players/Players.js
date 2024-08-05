import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import Player from './Player/Player'
import useStyles from './styles'

const Players = ({ setCurrentId }) => {
    const { players, isLoading } = useSelector((state) => state.players)
    const classes = useStyles()

    if(!players.length && !isLoading) return 'No players to show'

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} spacing={3} container align="stretch">
                {players.map((player) => (
                    <Grid key={player._id} item xs={12} sm={6} md={6} lg={4}>
                        <Player key={player._id} player={player} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Players
