import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';

class Login extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getNaverLoginUrl();
	}

	render() {
		const { naverLoginUrl } = this.props;
		return (
			<div id="login">
				<a href={naverLoginUrl}>
					<button type="button">login</button>
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
