import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';

class Logout extends Component {
	constructor() {
		super();
		window.naverSignInCallback = this.naverSignInCallback.bind(this);
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		// console.log(naver_id_login.oauthParams.access_token);
		naver_id_login.get_naver_userprofile('naverSignInCallback()');
		this.naverSignInCallback(naver_id_login);
	}

	naverSignInCallback = naver_id_login => {
		const { UserAction } = this.props;

		console.log(naver_id_login.getProfileData('email'));
		// UserAction.setEmail(naver_id_login.getProfileData('email'));
	};

	render() {
		return (
			<div id="logout">
				<p>{this.props.email}</p>
				<button type="button">logout</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		email: state.user.email
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
