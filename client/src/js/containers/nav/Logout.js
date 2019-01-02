import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';

class Logout extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction, token_type, access_token } = this.props;
		// UserAction.getUserInfo(token_type, access_token);
	}

	clickLogout = () => {
		const { UserAction } = this.props;
		localStorage.clear();
		UserAction.setToken(null, null);
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
		token_type: state.user.token_type,
		access_token: state.user.access_token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
