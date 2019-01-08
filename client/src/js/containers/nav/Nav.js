import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import { stat } from 'fs';
import * as userAction from '../../modules/user';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		if (localStorage.getItem('token') === null) {
			if (window.location.search.slice(0, 7) === '?token=') {
				const { UserAction } = this.props;
				localStorage.setItem('token', window.location.search.slice(7));
				window.location.href = 'http://14.39.199.54:3000/';
			}
		}
	}

	render() {
		const { userEmail, userMoney } = this.props;
		const token = localStorage.getItem('token');

		return <div id="nav">{token === null ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({
		userEmail: state.user.userEmail,
		userMoney: state.user.userMoney
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
