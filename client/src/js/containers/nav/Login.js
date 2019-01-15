import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import naverLoginIcon from './icon/naver_login_icon.PNG';

class Login extends Component {
	// 네이버 로그인 Url을 가져온다.
	constructor() {
		super();
		this.state = {
			isLoading: false,
			naverLoginUrl: null
		};
	}

	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getNaverLoginUrl().then(res => {
			this.setState({ isLoading: true, naverLoginUrl: res.data.naverLoginUrl });
		});
	}

	render() {
		const { isLoading, naverLoginUrl } = this.state;
		return isLoading ? (
			<div id="login">
				<a href={naverLoginUrl}>
					<div id="loginBtn" type="button">
						<img alt="" src={naverLoginIcon} />
					</div>
				</a>
			</div>
		) : null;
	}
}

export default connect(
	state => ({}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Login);
