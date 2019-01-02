import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: ''
		};
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		const state = naver_id_login.getUniqState();
		naver_id_login.setDomain('http://54.81.41.223:3000');
		naver_id_login.setState(state);
		naver_id_login.init_naver_id_login();
	}

	render() {
		const { UserAction, naverLoginUrl } = this.props;

		return (
			<div id="login">
				<div id="naver_id_login" />
			</div>
		);
	}
}

export default connect(
	state => ({
		naverLoginUrl: state.user.naverLoginUrl
	}),
	dispatch => ({})
)(Login);
