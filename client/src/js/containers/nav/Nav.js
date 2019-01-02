import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	constructor() {
		super();
		this.state = {
			isLogin: false
		};
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		const isLogin = !!naver_id_login.oauthParams.access_token;
		this.setState({ isLogin });
	}

	render() {
		const { isLogin } = this.state;
		return <div id="nav">{isLogin === false ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
