import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonAction from '../../modules/common';
import './nav.css';

class ConnectedNav extends Component {
	constructor() {
		super();
	}

	render() {
		const { curPage, isLogin, CommonAction } = this.props;
		console.log(isLogin);
		return (
			<div id="nav">
				<div onClick={() => CommonAction.movePage('index')}>logo</div>
				{!isLogin ? (
					<div id="login">
						<input />
						<input />
						<button type="button">login</button>
					</div>
				) : null}
				{!isLogin ? (
					<div id="join">
						<button type="button">join</button>
					</div>
				) : null}
				<button type="button" onClick={() => CommonAction.toggleIsAdmin()}>
					{'isAdmin'}
				</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		curPage: state.common.curPage,
		isLogin: state.common.isLogin
	}),
	dispatch => ({
		CommonAction: bindActionCreators(commonAction, dispatch)
	})
)(ConnectedNav);
