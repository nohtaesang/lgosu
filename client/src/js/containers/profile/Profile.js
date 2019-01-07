import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './profile.css';

class Profile extends Component {
	constructor() {
		super();
	}

	render() {
		const { userEmail, userMoney } = this.props;
		return (
			<div id="profile">
				<p>{userEmail}</p>
				<p>{userMoney}</p>
			</div>
		);
	}
}

export default connect(state => ({
	userEmail: state.user.userEmail,
	userMoney: state.user.userMoney
}))(Profile);
