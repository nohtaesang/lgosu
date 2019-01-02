import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';

class Nav extends Component {
	constructor() {
		super();
		this.state = {
			email: ''
		};
		window.naverSingInCallBack = this.naverSingInCallBack.bind(this);
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		const state = naver_id_login.getUniqState();
		naver_id_login.setDomain('http://54.81.41.223:3000');
		naver_id_login.setState(state);
		naver_id_login.init_naver_id_login();

		naver_id_login.get_naver_userprofile('naverSignInCallback()');
	}

	naverSingInCallBack = () => {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		console.log(naver_id_login.oauthParams.access_token);
		console.log(naver_id_login.getProfileData('nickname'));
		console.log(naver_id_login.getProfileData('email'));
		console.log(naver_id_login.getProfileData('birth'));

		this.setState({
			email: naver_id_login.getProfileData('email')
		});
	};

	render() {
		const { UserAction, naverLoginUrl } = this.props;

		return (
			<div id="nav">
				<div id="naver_id_login" />
				<p>{this.state.email}</p>
			</div>
		);
	}
}

export default connect(
	state => ({
		naverLoginUrl: state.user.naverLoginUrl
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
