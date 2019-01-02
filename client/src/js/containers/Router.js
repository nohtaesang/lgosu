import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import './app.css';

const Router = () => (
	<BrowserRouter>
		<Route exact path="/" component={App} />
	</BrowserRouter>
);

export default Router;
