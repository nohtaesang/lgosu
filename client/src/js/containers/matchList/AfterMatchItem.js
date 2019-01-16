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
		const { match } = this.props;
		this.setState(Object.assign(this.isBet(), { dividendMoney: match.dividendMoney }));
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



	// match 정보에서 userBettings의 값으로 배당률을 계산하여 state의 dividendRate를 정한다.
	getDividendRate = index => {
		const { dividendMoney } = this.state;

		const sum = dividendMoney.reduce((a, i) => a + i, 0);
		const dividendRate = (sum / dividendMoney[index]).toFixed(2);
		return dividendRate;
	};

	getTeamInfo = enName => {
		const { teamInfo } = this.props;
		for (const a of teamInfo) {
			if (a.enName === enName) return a;
		}
		return false;
	};

	render() {
		const { isBet, betMoney, option, dividendMoney, dividendRate } = this.state;
		const { match } = this.props;
		const { date, bettingOptions, result, home, away } = match;
		const homeInfo = this.getTeamInfo(home);
		const awayInfo = this.getTeamInfo(away);
		const newDate = new Date(date);

		return (
			<div className={`matchItem after ${option === result ? 'hit' : null}`}>
				<div className="matchInfo">
					<div className="date">
						{`${newDate.getFullYear()}/${newDate.getMonth()
							+ 1}/${newDate.getDate()} ${newDate.getHours()}:00시`}
					</div>
					<div className="team">
						{home ? <img className="homeLogo" alt="" src={homeInfo.logo} /> : null}
						{away ? <img className="awayLogo" alt="" src={awayInfo.logo} /> : null}
					</div>
				</div>
				<div className="bettingInfo">
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
								{`${o.homeScore} : ${o.awayScore}`}
								<p className="dividendRate">{`x${this.getDividendRate(i)}`}</p>
							</button>
						))}
					</div>
				</div>
				{!isBet ? (
					<div className="label">미참여</div>
				) : option === result ? (
					<div className="label hit">{`적중 ${parseInt(betMoney * this.getDividendRate(option), 10)}`}</div>
				) : (
					<div className="label fail">적중 실패 </div>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.user.userInfoFromNaver,
		userMoney: state.user.userMoney,
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(AfterMatchItem);
