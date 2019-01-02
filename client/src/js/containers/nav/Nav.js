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
		const { UserAction, type_token } = this.props;
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));

		if (localStorage.type_token) {
			UserAction.setToken(naver_id_login.oauthParams.type_token, naver_id_login.oauthParams.access_token);
		} else if (naver_id_login.oauthParams.access_token && type_token === null) {
			localStorage.setItem('type_token', naver_id_login.oauthParams.type_token);
			localStorage.setItem('access_token', naver_id_login.oauthParams.access_token);
			UserAction.setToken(naver_id_login.oauthParams.type_token, naver_id_login.oauthParams.access_token);
			window.location.href = 'http://54.81.41.223:3000/';
		}
	}

	render() {
		const { type_token } = this.props;
		return <div id="nav">{type_token === null ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({
		type_token: state.user.type_token,
		access_token: state.user.access_token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
