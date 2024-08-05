import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PlayerDetails from './components/PlayerDetails/PlayerDetails'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <BrowserRouter>
            <div style={{ width: "100%", margin: 0 }}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/players" />} />
                    <Route path="/players" exact component={Home} />
                    <Route path="/players/search" exact component={Home} />
                    <Route path="/players/:id" component={PlayerDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/players" />)} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App