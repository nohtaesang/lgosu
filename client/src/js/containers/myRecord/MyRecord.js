import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RecordStats from './RecordStats';
import RecordItem from './RecordItem';
import * as userAction from '../../modules/user';
import './myRecord.css';

class MyRecord extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			numberOfBettingResults: 10,
			userInfo: null,
			bettingResults: null
		};
	}

	componentDidMount() {
		const { UserAction, userInfoFromNaver } = this.props;
		UserAction.getUserInfo(userInfoFromNaver.email).then(u => {
			const { bettingResults } = u.data;
			this.setState({ isLoading: true, userInfo: u.data, bettingResults: bettingResults.reverse() });
		});
	}

	getMoreBettingResults = async () => {
		const { numberOfBettingResults } = this.state;
		this.setState({ numberOfBettingResults: numberOfBettingResults + 10 });
	};

	render() {
		const { userInfo, bettingResults, numberOfBettingResults, isLoading } = this.state;
		const dispBettingResults = isLoading ? bettingResults.slice(0, numberOfBettingResults) : null;
		return isLoading ? (
			<div id="myRecord">
				<div id="recordStatsTitle">나의 기록</div>
				<div id="recordStats">
					<div id="win">승</div>
					<div id="lose">패</div>
					<div id="winningRate">승률</div>
					<div id="maxDividendRate">최고 배당률</div>
					<div id="maxGetMoney">최고 획득 금액</div>
					<div id="maxMoney">최대 소유 금액</div>
				</div>
				<RecordStats userInfo={userInfo} />

				<div className="widthBoundary" />

				<div id="bettingResultsTitle">나의 배팅 내역</div>
				<div className="bettingResult head">
					<div className="mark">결과</div>
					<div className="date">날짜</div>
					<div className="home">홈</div>
					<div className="away">어웨이</div>
					<div className="myPrediction">내 예상</div>
					<div className="myDividendRate">배당률</div>
					<div className="myMoney">배팅한 금액</div>
					<div className="resultPrediction">결과</div>
					<div className="resultDividendRate">배당률</div>
					<div className="resultMoney">증감</div>
				</div>

				{dispBettingResults.map((b, i) => (
					<RecordItem key={i} bettingResult={b} />
				))}

				{numberOfBettingResults <= bettingResults.length ? (
					<button id="getMoreBettingResultBtn" type="button" onClick={this.getMoreBettingResults}>
						{'더 불러오기'}
					</button>
				) : null}
			</div>
		) : null;
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.user.userInfoFromNaver,
		userInfo: state.user.userInfo,
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(MyRecord);
