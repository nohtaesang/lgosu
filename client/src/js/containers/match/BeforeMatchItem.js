import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import * as userAction from '../../modules/user';

class BeforeMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			isBet: false,
			betMoney: 0,
			option: null,
			dividendMoney: []
		};
	}

	componentDidMount() {
		const { match } = this.props;
		this.isDuringMatch();
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

	// 시간을 체크 한 후 경기중일경우 true를 반환한다. 그리고 match의 bettingState를 변경한다.
	isDuringMatch = () => {
		const { MatchAction, match, numberOfMatches, matchOption } = this.props;
		const curDate = new Date();
		const matchDate = new Date(match.date);
		if (curDate >= matchDate) {
			MatchAction.updateMatch(match._id, { bettingState: 1 }).then(() => {
				if (match.bettingState === 0) {
					// window.location.href = 'http://14.39.199.54:3000/';
					MatchAction.getMatchList(numberOfMatches, matchOption);
				}
			});
		}

		return curDate >= matchDate;
	};

	// match 정보에서 userBettings의 값으로 배당률을 계산하여 state의 dividendRate를 정한다.
	getDividendRate = index => {
		const { dividendMoney } = this.state;

		const sum = dividendMoney.reduce((a, i) => a + i, 0);
		const dividendRate = (sum / dividendMoney[index]).toFixed(2);
		return dividendRate;
	};

	// 클릭으로 state의 option을 변경
	clickBettingOption = e => {
		const option = parseInt(e.target.name, 10);
		this.setState({ option });
	};

	// state의 betMoney를 변경시킨다. (소지금 안넘기, 음수 차단, 숫자가 아닌 값 차단)
	changeBetMoney = e => {
		const { userMoney } = this.props;
		let betMoney = e.target.value;
		betMoney = betMoney > userMoney ? userMoney : betMoney;
		betMoney = betMoney < 0 ? 0 : betMoney;
		betMoney = parseInt(betMoney, 10);
		betMoney = Number.isNaN(betMoney) ? 0 : betMoney;
		this.setState({ betMoney });
	};

	// click bet: (모든 조건이 충족되면 사용자의 돈을 차감시키고 userBettings 에 추가한다)
	clickBet = async () => {
		const { isLoading, betMoney, option, dividendMoney } = this.state;
		const { MatchAction, UserAction, match, userInfoFromNaver, numberOfMatches, matchOption } = this.props;

		if (this.isDuringMatch() || betMoney === 0 || option === null || userInfoFromNaver.email === null) return;

		if (isLoading) return;
		const newDividendMoney = dividendMoney.map((a, i) => {
			if (i === option) {
				return a + betMoney;
			}
			return a;
		});
		try {
			this.setState({ isLoading: true });
			Promise.all([
				MatchAction.bet(match._id, userInfoFromNaver.email, option, betMoney),
				MatchAction.updateMatch(match._id, { dividendMoney: newDividendMoney }),
				UserAction.changeUserMoney(userInfoFromNaver.email, -betMoney),
				UserAction.insertBettingList(userInfoFromNaver.email, match._id)
			])
				.then(() => {
					UserAction.getUserInfoFromDB(userInfoFromNaver.email);
				})
				.then(() => {
					this.setState({
						isLoading: false,
						isBet: true,
						dividendMoney: newDividendMoney
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	clickBetCancel = async () => {
		const { isLoading, betMoney, dividendMoney, option } = this.state;
		const { MatchAction, UserAction, userInfoFromNaver, match } = this.props;

		if (isLoading) return;
		const newDividendMoney = dividendMoney.map((a, i) => {
			if (i === option) {
				return a - betMoney;
			}
			return a;
		});
		try {
			this.setState({ isLoading: true });
			Promise.all([
				MatchAction.cancelBet(match._id, userInfoFromNaver.email),
				MatchAction.updateMatch(match._id, { dividendMoney: newDividendMoney }),
				UserAction.changeUserMoney(userInfoFromNaver.email, betMoney),
				UserAction.deleteBettingList(userInfoFromNaver.email, match._id)
			])
				.then(() => {
					UserAction.getUserInfoFromDB(userInfoFromNaver.email);
				})
				.then(() => {
					this.setState({
						isLoading: false,
						isBet: false,
						dividendMoney: newDividendMoney
					});
				});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { isBet, betMoney, option, dividendMoney, dividendRate } = this.state;
		const { match, home, away } = this.props;
		const { date, bettingOptions } = match;
		const newDate = new Date(date);

		return (
			<div className="matchItem before">
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

				{!isBet ? (
					<div className="beforeBet">
						<div className="options">
							{bettingOptions.map((o, i) => (
								<button
									type="button"
									key={i}
									name={i}
									className={i === option ? 'pick' : null}
									onClick={this.clickBettingOption}
								>
									{`${o.homeScore} : ${o.awayScore} [${dividendMoney[i]}원, x${this.getDividendRate(
										i
									)}배 ]`}
								</button>
							))}
						</div>

						<input type="number" className="betMoney" value={betMoney} onChange={this.changeBetMoney} />
						<button type="button" className="betBtn" onClick={this.clickBet}>
							{`${betMoney}원 배팅하기`}
						</button>
					</div>
				) : (
					<div className="afterBet">
						<div className="options">
							{bettingOptions.map((o, i) => (
								<button
									type="button"
									key={i}
									name={i}
									className={i === option ? 'pick' : null}
									onClick={this.clickBettingOption}
									disabled
								>
									{`${o.homeScore} : ${o.awayScore} [${dividendMoney[i]}원, x${this.getDividendRate(
										i
									)}배 ]`}
								</button>
							))}
						</div>

						<button type="button" className="betCancelBtn" onClick={this.clickBetCancel}>
							{`${betMoney}원 취소하기`}
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchList: state.match.matchList,
		matchOption: state.match.matchOption,
		numberOfMatches: state.match.numberOfMatches,
		userInfoFromNaver: state.user.userInfoFromNaver,
		userMoney: state.user.userMoney
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(BeforeMatchItem);
