import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Logout extends Component {
	constructor() {
		super();
		this.state = {
			email: ''
		};
		window.naverSignInCallBack = this.naverSignInCallBack.bind(this);
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		console.log(naver_id_login.oauthParams.access_token);
		naver_id_login.get_naver_userprofile('naverSignInCallback()');
	}

	naverSignInCallBack = () => {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
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
			<div id="logout">
				<p>{this.state.email}</p>
				<button type="button">logout</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		naverLoginUrl: state.user.naverLoginUrl
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
