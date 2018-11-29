import React from 'react';
import Nav from './nav/Nav';
import Join from './container/Join';
import Prediction from './container/Prediction';
import '../../css/components/App.css';

const App = () => (
    <div id="app">
        <Nav />
        <Prediction />
    </div>
);

export default App;
