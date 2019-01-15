import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import * as userAction from '../../modules/user';

class NonUserMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			dividendMoney: []
		};
	}

	componentDidMount() {
		const { match } = this.props;
		this.setState({ isLoading: true, dividendMoney: match.dividendMoney });
	}

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
		const { isLoading, option } = this.state;
		const { match } = this.props;
		const { date, home, away, bettingOptions } = match;
		const homeInfo = this.getTeamInfo(home);
		const awayInfo = this.getTeamInfo(away);
		const newDate = new Date(date);
		return isLoading ? (
			<div className="matchItem before">
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
								className={i === option ? 'pick' : null}
								onClick={this.clickBettingOption}
							>
								{`${o.homeScore} : ${o.awayScore}`}
								<p className="dividendRate">{`x${this.getDividendRate(i)}`}</p>
							</button>
						))}
					</div>

					<button type="button" className="betCancelBtn" disabled>
						{'로그인 후 이용해 주세요'}
					</button>
				</div>
			</div>
		) : null;
	}
}

export default connect(
	state => ({
		matchList: state.match.matchList,
		matchOption: state.match.matchOption,
		numberOfMatches: state.match.numberOfMatches,
		userInfoFromNaver: state.user.userInfoFromNaver,
		userMoney: state.user.userMoney,
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(NonUserMatchItem);
