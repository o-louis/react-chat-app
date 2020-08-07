import React from 'react';

import Home from './components/Home/Home';
import Room from './components/Room/Room';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/room/:id" component={Room} />
        </Router>
    )
}

export default App;
