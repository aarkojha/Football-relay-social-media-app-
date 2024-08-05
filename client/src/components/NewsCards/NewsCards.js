import React from 'react'
import NewsCard from './NewsCard/NewsCard'
import { Grid } from '@material-ui/core'

import useStyles from './styles.js'

const NewsCards = ({ articles }) => {
    const classes = useStyles();

    return (

        <Grid className={classes.container} spacing={1} container align="stretch">
            {articles?.map((article, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                    <NewsCard article={article} i={i} />
                </Grid>
            ))}
        </Grid>
    )
}

export default NewsCards