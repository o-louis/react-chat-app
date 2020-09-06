import React, { useState } from 'react';

import Home from './components/Home/Home';
import Room from './components/Room/Room';
import PrivateRoute from "./PrivateRoute";

import "./App.css"

import { AuthContext } from "./context/auth";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
            <Router>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/room/:id" component={Room} />
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
