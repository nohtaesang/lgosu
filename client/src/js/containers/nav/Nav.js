import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';

class Nav extends Component {
	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getNaverLoginUrl();
	}

	render() {
		const { UserAction, naverLoginUrl } = this.props;
		console.log(naverLoginUrl);
		return (
			<div id="nav">
				<button type="button" onClick={() => UserAction.clickNaverLogin(naverLoginUrl)}>
					{'login'}
				</button>
				<a href={naverLoginUrl}>a tag login</a>
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
