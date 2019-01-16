import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	componentDidMount() {
		// 로그인이 되었을 때, GET Url을 읽어 토큰에 맞는 유저를 로그인 시킨 후 페이지를 다시 로드한다.
		if (localStorage.getItem('token') === null) {
			if (window.location.search.slice(0, 7) === '?token=') {
				localStorage.setItem('token', window.location.search.slice(7));
				window.location.href = 'http://3.88.93.58';
			}
		}
	}

	render() {
		const token = localStorage.getItem('token');
		return (
			<div id="nav">
				<p id="logo">LOL TOTO</p>
				{token === null ? <Login /> : <Logout />}
			</div>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({})
)(Nav);
