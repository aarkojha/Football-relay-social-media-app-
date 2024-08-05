import { FETCH_PLAYER, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes'

const reducer = (state = { isLoading: true, players: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                players: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                players: action.payload
            }
        case FETCH_PLAYER:
            return {
                ...state,
                player: action.payload
            }
        case CREATE:
            return { ...state, players: [...state.players, action.payload] }
        case UPDATE:
        case LIKE:
            return { 
                ...state, 
                players: state.players.map(player => player._id === action.payload._id ? action.payload : player) }
        case COMMENT:
            return {
                ...state, 
                players: state.players.map(player => {
                    if(player._id === action.payload._id) {
                        return action.payload
                    }
                    return player
                })
            }
        case DELETE:
            return { ...state, players: state.players.filter(player => player._id !== action.payload) }
        default:
            return state
    }
}

export default reducer