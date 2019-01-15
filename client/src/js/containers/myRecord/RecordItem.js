import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import './myRecord.css';

class RecordItem extends Component {
	constructor() {
		super();
	}

	getKoName = name => {
		const { teamInfo } = this.props;
		for (const a of teamInfo) {
			if (name === a.enName) return a;
		}
		return false;
	};

	getScoreByOption = option => {
		const { bettingResult } = this.props;
		const { category } = bettingResult;
		if (category === 'lck') {
			if (option === 0) {
				return '2 : 0';
			}
			if (option === 1) {
				return '2 : 1';
			}
			if (option === 2) {
				return '0 : 2';
			}
			if (option === 3) {
				return '1 : 2';
			}
		}
		return false;
	};

	render() {
		const { bettingResult } = this.props;
		const {
			date,
			home,
			away,
			myPrediction,
			myDividendRate,
			myMoney,
			resultPrediction,
			resultDividendRate,
			resultMoney
		} = bettingResult;
		const newDate = new Date(date);

		return (
			<div className="bettingResult">
				<div className={myPrediction === resultPrediction ? 'mark hit' : 'mark fail'}>
					{myPrediction === resultPrediction ? '적중' : '실패'}
				</div>

				<div className="date">
					{`${new Date(newDate).getFullYear()}/${new Date(newDate).getMonth() + 1}/${new Date(
						newDate
					).getDate()} ${new Date(newDate).getHours()}:00시`}
				</div>
				<div className="home">{this.getKoName(home).koName}</div>
				<div className="away">{this.getKoName(away).koName}</div>
				<div className="myPrediction">{this.getScoreByOption(myPrediction)}</div>
				<div className="myDividendRate">{myDividendRate}</div>
				<div className="myMoney">{myMoney}</div>
				<div className="resultPrediction">{this.getScoreByOption(resultPrediction)}</div>
				<div className="resultDividendRate">{resultDividendRate}</div>
				<div className="resultMoney">{resultMoney}</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({})
)(RecordItem);
