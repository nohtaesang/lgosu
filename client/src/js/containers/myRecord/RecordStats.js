import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import './myRecord.css';
import { bet } from '../../modules/match';

class RecordStats extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false
		};
	}

	render() {
		const { userInfo } = this.props;
		const { win, lose, winningRate, maxDividendRate, maxGetMoney, maxMoney } = userInfo;

		return (
			<div id="recordStats">
				<div id="win">{win}</div>
				<div id="lose">{lose}</div>
				<div id="winningRate">{`${winningRate}%`}</div>
				<div id="maxDividendRate">{maxDividendRate}</div>
				<div id="maxGetMoney">{maxGetMoney}</div>
				<div id="maxMoney">{maxMoney}</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.user.userInfoFromNaver,
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(RecordStats);
