import React from 'react';
import DevTools from './DevTools';
import Nav from './nav/Nav';
import Match from './match/Match';
import './app.css';

const App = () => (
	<div id="app">
		<Nav />
		<Match />
		{/* <DevTools /> */}
	</div>
);

export default App;

// TODO: 내 배팅 내역 조회! (날짜, 상대, 내예상, 결과, 금액 표시). 매치 아이디로 매치 조회 후(날짜, 상대, 결과) 베팅유저스에서 유저 이메일을 검색(내예상, 금액),
