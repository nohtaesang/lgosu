import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';

class Logout extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false
		};
	}

	componentDidMount() {
		const { UserAction, token } = this.props;
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
		if (token === null) {
			UserAction.setToken(naver_id_login.oauthParams.access_token);
			this.renderRedirect();
		}
	}

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
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
		email: state.user.email,
		token: state.user.token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
