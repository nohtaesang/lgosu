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
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));
	}

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
