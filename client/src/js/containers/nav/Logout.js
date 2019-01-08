import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import naverLoginIcon from './icon/naver_logout_icon.PNG';

class Logout extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getUserInfoFromNaver(localStorage.token).then(() => {
			UserAction.getUserInfoFromDB(this.props.userEmail);
		});
	}

	clickLogout = () => {
		const { UserAction } = this.props;
		localStorage.clear();
		UserAction.clickLogout();
		window.location.href = 'http://14.39.199.54:3000/';
	};

	render() {
		return (
			<div id="logout">
				<div className="logoutBtn" onClick={this.clickLogout}>
					<img alt="" src={naverLoginIcon} />
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		userEmail: state.user.userEmail,
		token: state.user.token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
