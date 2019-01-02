import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './containers/Router';

render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById('root')
);
