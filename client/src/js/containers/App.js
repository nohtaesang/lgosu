import React from 'react';
import DevTools from './DevTools';
import Nav from './nav/Nav';
import Section from './section/Section';
import Tab from './tab/Tab';
import Team from './Team';
import './app.css';

const App = () => (
	<div id="app">
		<Nav />
		<Tab />
		<div id="section-top" />
		<Section />
		{/* <div id="section-bottom" /> */}
		<div id="footer" />
		<Team />
		{/* <DevTools /> */}
	</div>
);

export default App;

// TODO:
// 깃 허브에 최종 커밋
// AWS에 올리기
// 와이고수, FM, OPGG에 올리기
