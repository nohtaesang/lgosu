import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import user, * as userAction from '../../modules/user';

class AdminMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			option: null,
			dividendMoney: null,
			dividendRate: null
		};
	}

	componentDidMount() {
		this.setState(this.getDividend());
	}

	// 경기의 상태를 상태 변경함 (적용이 안 됐을 경우 강제로 시키는 버튼)
	clickSetBettingState = async e => {
		const { option } = this.state;
		const { MatchAction, numberOfMatches, matchOption, match } = this.props;
		const bettingState = parseInt(e.target.name, 10);
		if (bettingState === 2) {
			if (option === null) return;
			await this.dividendPayout();
			await MatchAction.updateMatch(match._id, { bettingState });
			await MatchAction.getMatchList(numberOfMatches, matchOption);
		} else {
			await MatchAction.updateMatch(match._id, { bettingState });
			await MatchAction.getMatchList(numberOfMatches, matchOption);
		}
	};

	// 클릭으로 state의 option을 변경
	clickBettingOption = e => {
		const option = parseInt(e.target.name, 10);
		this.setState({ option });
	};

	// 결과 정보를 유저의 bettingResults에 저장한다
	// id, category, date, home, away, myPrediction, myDividendRate, myMoney, resultPrediction, resultDividendRate,  resultMoney
	dividendPayout = async () => {
		const { option, dividendMoney, dividendRate } = this.state;
		const { MatchAction, UserAction, match } = this.props;
		const { _id, category, date, home, away, bettingUsers } = match;
		await MatchAction.updateMatch(match._id, { result: option });
		for (const u of bettingUsers) {
			if (u.option === option) {
				UserAction.changeUserMoney(u.userEmail, parseInt(u.betMoney * dividendRate[option], 10)).then(m => {
					const { money } = m.data;
					this.updateUserStats(parseInt(money, 10)); // 획득한 금액을 매개변수로 updateUserStats를 호출
				});

				UserAction.insertBettingResults(
					u.userEmail,
					_id,
					category,
					date,
					home,
					away,
					u.option,
					dividendRate[u.option],
					u.betMoney,
					option,
					dividendRate[option],
					parseInt(u.betMoney * dividendRate[option], 10)
				);
			} else {
				this.updateUserStats();
				UserAction.insertBettingResults(
					u.userEmail,
					_id,
					category,
					date,
					home,
					away,
					u.option,
					dividendRate[u.option],
					u.betMoney,
					option,
					dividendRate[option],
					-u.betMoney
				);
			}
		}
	};

	// Stats에 저장할 내용을 보낸다.
	// win, lose, winningRate, maxDividendRate, maxGetMoney, maxMoney
	updateUserStats = () => {
		const { option, dividendRate } = this.state;
		const { UserAction, match } = this.props;
		const { bettingUsers } = match;
		for (const u of bettingUsers) {
			if (u.option === option) {
				UserAction.getUserInfo(u.userEmail).then(a => {
					const userInfo = a.data;
					const { win, lose, maxDividendRate, maxGetMoney, maxMoney, userMoney } = userInfo;
					const winningRate = ((win + 1) / (win + 1 + lose)).toFixed(2) * 100;
					const newMaxDividendRate =						dividendRate[option] > maxDividendRate ? dividendRate[option] : maxDividendRate;
					const newMaxGetMoney =						parseInt(u.betMoney * dividendRate[option], 10) > maxGetMoney
						? parseInt(u.betMoney * dividendRate[option], 10)
						: maxGetMoney;
					const newMaxMoney = maxMoney > userMoney ? maxMoney : userMoney;
					UserAction.updateUser(u.userEmail, {
						win: win + 1,
						lose,
						winningRate,
						maxDividendRate: newMaxDividendRate,
						maxGetMoney: newMaxGetMoney,
						maxMoney: newMaxMoney
					});
				});
			} else {
				UserAction.getUserInfo(u.userEmail).then(a => {
					const userInfo = a.data;
					const { win, lose } = userInfo;
					const winningRate = (win / (win + 1 + lose)).toFixed(2) * 100;
					UserAction.updateUser(u.userEmail, { lose: lose + 1, winningRate });
				});
			}
		}
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

	// 경기를 삭제한다
	clickDeleteMatch = async () => {
		const { MatchAction, numberOfMatches, matchOption, match } = this.props;
		try {
			await MatchAction.deleteMatch(match._id);
			await MatchAction.getMatchList(numberOfMatches, matchOption);
		} catch (e) {
			console.log('err');
		}
	};

	render() {
		const { option } = this.state;
		const { match } = this.props;
		const { date, home, away, bettingOptions, bettingState } = match;
		const newDate = new Date(date);
		// this.updateUserStats();
		return (
			<div className="matchItem admin">
				<div className="matchInfo">
					<div className="date">
						{`${newDate.getFullYear()}/${newDate.getMonth()
							+ 1}/${newDate.getDate()} ${newDate.getHours()}:00시`}
					</div>
					<p className="team">{`${home} vs ${away}`}</p>
				</div>
				<div className="bettingInfo">
					{bettingState === 0 ? (
						<div className="options">
							<button
								type="button"
								className="setDuringMatchBtn"
								name="1"
								onClick={this.clickSetBettingState}
							>
								{'경기중으로'}
							</button>
							<button type="button" className="deleteMatchBtn" onClick={this.clickDeleteMatch}>
								{'삭제'}
							</button>
						</div>
					) : null}
					{bettingState === 1 ? (
						<div className="options">
							<button
								type="button"
								className="setBeforeMatchBtn"
								name="0"
								onClick={this.clickSetBettingState}
							>
								{'경기전으로'}
							</button>
							{bettingOptions.map((o, i) => (
								<button
									type="button"
									key={i}
									name={i}
									className={i === option ? 'pick' : null}
									onClick={this.clickBettingOption}
								>
									{`${o.homeScore} : ${o.awayScore}`}
								</button>
							))}

							<button
								type="button"
								className="setAfterMatchBtn"
								name="2"
								onClick={this.clickSetBettingState}
							>
								{'경기 종료'}
							</button>
							<button type="button" className="deleteMatchBtn" onClick={this.clickDeleteMatch}>
								{'삭제'}
							</button>
						</div>
					) : null}
					{bettingState === 2 ? (
						<div className="options">
							<button
								type="button"
								className="setDuringMatchBtn"
								name="1"
								onClick={this.clickSetBettingState}
							>
								{'경기중으로'}
							</button>
							<button type="button" className="deleteMatchBtn" onClick={this.clickDeleteMatch}>
								{'삭제'}
							</button>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption,
		userInfoFromNaver: state.user.userInfoFromNaver
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(AdminMatchItem);
