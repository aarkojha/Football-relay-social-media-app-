import { combineReducers } from 'redux'

import players from './players'
import auth from './auth'

export default combineReducers({ players, auth })