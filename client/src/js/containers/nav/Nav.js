import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction, token_type } = this.props;
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		console.log(naver_id_login.oauthParams.token_type);
		if (localStorage.token_type) {
			UserAction.setToken(naver_id_login.oauthParams.token_type, naver_id_login.oauthParams.access_token);
		} else if (naver_id_login.oauthParams.token_type && token_type === null) {
			localStorage.setItem('token_type', naver_id_login.oauthParams.token_type);
			localStorage.setItem('access_token', naver_id_login.oauthParams.access_token);
			UserAction.setToken(naver_id_login.oauthParams.token_type, naver_id_login.oauthParams.access_token);
			window.location.href = 'http://54.81.41.223:3000/';
		}
	}

	render() {
		const { token_type } = this.props;
		console.log(token_type);
		return <div id="nav">{token_type === null ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({
		token_type: state.user.token_type,
		access_token: state.user.access_token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
