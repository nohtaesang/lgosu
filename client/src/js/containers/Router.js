import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import './app.css';

const Router = () => (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/callback" component={App} />
		</div>
	</BrowserRouter>
);

export default Router;
