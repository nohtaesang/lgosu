import React from 'react';
import DevTools from './DevTools';
import Profile from './profile/Profile';
import Ranking from './ranking/Ranking';

import Match from './match/Match';
import Chatting from './chatting/Chatting';
import './app.css';

const App = () => (
	<div id="app">
		<div id="left">
			<Profile />
			<Ranking />
		</div>
		<div id="center">
			<Match />
		</div>
		<div id="right">
			<Chatting />
		</div>

		{/* <DevTools /> */}
	</div>
);

export default App;
