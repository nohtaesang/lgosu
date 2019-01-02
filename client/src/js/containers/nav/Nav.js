import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	constructor() {
		super();
	}

	render() {
		const { token } = this.props;
		return <div id="nav">{token === null ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({
		token: state.user.token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
