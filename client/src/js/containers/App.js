import React from 'react';
import DevTools from './DevTools';
import Nav from './nav/Nav';
import Profile from './profile/Profile';
import Match from './match/Match';
import Ranking from './ranking/Ranking';
import Chatting from './chatting/Chatting';
import './app.css';

const App = () => (
	<div id="app">
		<Nav />
		<div className="left">
			<Profile />
		</div>
		<div className="center">
			<Match />
		</div>
		<div className="right">
			<Ranking />
			<Chatting />
		</div>

		<DevTools />
	</div>
);

export default App;
