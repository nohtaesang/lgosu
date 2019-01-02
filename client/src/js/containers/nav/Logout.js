import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';

class Logout extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction, token } = this.props;
		console.log(localStorage.token);
		// UserAction.getUserInfo(localStorage.token);
		const req = new XMLHttpRequest();
		req.open('GET', 'https://openapi.naver.com/v1/nid/me', true);
		req.setRequestHeader('Authorization', `Bearer ${localStorage.token}`);
		req.send(null);
		console.log(req.getResponseHeader('Content-Type'));
	}

	clickLogout = () => {
		const { UserAction } = this.props;
		localStorage.clear();
		UserAction.setToken(null);
	};

	render() {
		return (
			<div id="logout">
				<p>{this.props.email}</p>
				<button type="button" onClick={this.clickLogout}>
					{'logout'}
				</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		email: state.user.email,
		token: state.user.token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
