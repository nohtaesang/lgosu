import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';

class Nav extends Component {
	constructor() {
		super();
		window.naverSingInCallBack = this.naverSingInCallBack.bind(this);
		this.state = {
			email: ''
		};
	}

	componentDidMount() {
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		const state = naver_id_login.getUniqState();
		naver_id_login.setButton('white', 2, 40);
		naver_id_login.setDomain('http://54.81.41.223:3000');
		naver_id_login.setState(state);
		naver_id_login.init_naver_id_login();
		// const { UserAction } = this.props;
		// UserAction.getNaverLoginUrl();
	}

	naverSingInCallBack = () => {
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
		// console.log(naverLoginUrl);
		// console.log(this.props);
		return (
			<div id="nav">
				<button type="button" onClick={() => UserAction.clickNaverLogin(naverLoginUrl)}>
					{'login'}
				</button>
				<a href={naverLoginUrl}>a tag login</a>
				<div id="naver_id_login">login</div>
				<div>{`환영합니다${this.state.email}님`}</div>
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
