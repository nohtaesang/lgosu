import React from 'react';
import DevTools from './DevTools';
import Match from './match/Match';
import './app.css';

const App = () => (
	<div id="app">
		<Match />

		<DevTools />
	</div>
);

export default App;
