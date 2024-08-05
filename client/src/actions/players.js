import { FETCH_PLAYER, FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes'
import * as api from '../api'

// Action Creators
export const getPlayer = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const {data:{data}} = await api.fetchPlayer(id)
        dispatch({ type: FETCH_PLAYER, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPlayers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPlayers(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPlayersBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPlayersBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPlayer = (player, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPlayer(player)

        history.push(`/players/${data._id}`)
        
        dispatch({ type: CREATE, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const updatePlayer = (id, player) => async (dispatch) => {
    try {
        const { data } = await api.updatePlayer(id, player)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePlayer = (id) => async (dispatch) => {
    try {
        await api.deletePlayer(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePlayer = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePlayer(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const commentPlayer = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)
        dispatch({type: COMMENT, payload: data})

        return data.comments
    } catch (error) {
        console.log(error)
    }
}