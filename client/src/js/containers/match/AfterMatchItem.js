import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import * as userAction from '../../modules/user';

class AfterMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			isBet: false,
			betMoney: 0,
			option: null,
			dividendRate: [],
			dividendMoney: []
		};
	}

	componentDidMount() {
		this.isDuringMatch();
		this.setState(Object.assign(this.isBet(), this.getDividend()));
	}

	// match 정보에서 현재 email과 비교 후, 배팅을 했는지 확인한다. (option, betMoney, isBet 적용)
	isBet = () => {
		const { match, userInfoFromNaver } = this.props;
		const { bettingUsers } = match;
		const bettingUserIndex = bettingUsers.findIndex(users => users.userEmail === userInfoFromNaver.email);
		if (bettingUserIndex === -1) {
			return {
				isBet: false,
				betMoney: 0
			};
		}
		return {
			isBet: true,
			betMoney: bettingUsers[bettingUserIndex].betMoney,
			option: bettingUsers[bettingUserIndex].option
		};
	};

	// 시간을 체크 한 후 경기중일경우 true를 반환한다. 그리고 match의 bettingState를 변경한다.
	isDuringMatch = () => {
		const { MatchAction, match } = this.props;
		const curDate = new Date();
		const matchDate = new Date(match.date);
		if (curDate >= matchDate) {
			MatchAction.updateMatch(match._id, { bettingState: 1 });
		}

		return curDate >= matchDate;
	};

	// match 정보에서 userBettings의 값으로 배당률을 계산하여 state의 dividendRate를 정한다.
	getDividend = () => {
		const { match } = this.props;
		const { bettingOptions, bettingUsers } = match;

		const dividendMoney = new Array(bettingOptions.length).fill(1000);
		for (let i = 0; i < bettingUsers.length; i += 1) {
			dividendMoney[bettingUsers[i].option] += bettingUsers[i].betMoney;
		}
		const sum = dividendMoney.reduce((a, i) => a + i, 0);
		const dividendRate = dividendMoney.map((d, i) => (sum / d).toFixed(2));
		return {
			dividendMoney,
			dividendRate
		};
	};

	render() {
		const { isBet, betMoney, option, dividendMoney, dividendRate } = this.state;
		const { match, home, away } = this.props;
		const { date, bettingOptions, result } = match;
		const newDate = new Date(date);

		return (
			<div className="matchItem during">
				<div className="info">
					<div className="date">
						{`${newDate.getFullYear()}/${newDate.getMonth()
							+ 1}/${newDate.getDate()} ${newDate.getHours()}:00시`}
					</div>
					<div className="team">
						{home ? <img className="homeLogo" alt="" src={home.logo} /> : null}
						{away ? <img className="awayLogo" alt="" src={away.logo} /> : null}
					</div>
				</div>
				<div className="afterBet">
					<div className="options">
						{bettingOptions.map((o, i) => (
							<button
								type="button"
								key={i}
								name={i}
								className={
									i === option
										? i === result
											? 'pick result'
											: 'pick'
										: i === result
											? 'result'
											: null
								}
								onClick={this.clickBettingOption}
								disabled
							>
								{`${o.homeScore} : ${o.awayScore} [${dividendMoney[i]}원, x${dividendRate[i]}배 ]`}
							</button>
						))}
					</div>
				</div>
				{!isBet ? (
					<div className="label">미참여</div>
				) : option === result ? (
					<div className="label">{`적중 ${parseInt(betMoney * dividendRate[option], 10)}`}</div>
				) : (
					<div className="label">적중 실패 </div>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.user.userInfoFromNaver,
		userMoney: state.user.userMoney
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(AfterMatchItem);
