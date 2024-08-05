import axios from 'axios'

const API = axios.create({
  baseURL: 'https://football-dimes-pv.herokuapp.com/',
}) // Change to deployed backend-url

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})

export const fetchPlayer = (id) => API.get(`/players/${id}`)
export const fetchPlayers = (page) => API.get(`/players?page=${page}`)
export const fetchPlayersBySearch = (searchQuery) =>
  API.get(
    `/players/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  )
export const createPlayer = (newPlayer) => API.post('/players', newPlayer)
export const likePlayer = (id) => API.patch(`/players/${id}/likePlayer`)
export const comment = (value, id) =>
  API.post(`/players/${id}/commentPlayer`, { value })
export const updatePlayer = (id, updatedPlayer) =>
  API.patch(`/players/${id}`, updatedPlayer)
export const deletePlayer = (id) => API.delete(`/players/${id}`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
