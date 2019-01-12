import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import naverLoginIcon from './icon/naver_login_icon.PNG';

class Login extends Component {
	// 네이버 로그인 Url을 가져온다.
	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getNaverLoginUrl();
	}

	render() {
		const { naverLoginUrl } = this.props;
		return (
			<div id="login">
				<a href={naverLoginUrl}>
					<div id="loginBtn" type="button">
						<img alt="" src={naverLoginIcon} />
					</div>
				</a>
			</div>
		);
	}
}

export default connect(
	state => ({
		naverLoginUrl: state.user.naverLoginUrl
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Login);
