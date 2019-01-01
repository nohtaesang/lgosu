import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

class ConnectedMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			_id: null,
			option: null,
			money: 1000,
			isBet: false
		};
	}

	componentWillMount() {
		const { _id } = this.props.match;
		this.setState({
			_id
		});
	}

	// deleteMatch = async id => {
	// 	const { MatchAction } = this.props;
	// 	try {
	// 		await MatchAction.deleteMatch(id);
	// 		await this.getMatchList(this.props.numberOfMatches, this.props.matchOption);
	// 	} catch (e) {
	// 		console.log('err');
	// 	}
	// };

	// getMatchList = async () => {
	// 	const { MatchAction } = this.props;
	// 	try {
	// 		await MatchAction.getMatchList(this.props.numberOfMatches, this.props.matchOption);
	// 	} catch (e) {
	// 		console.log('err');
	// 	}
	// };

	clickBettingOption = async e => {
		const { option } = this.state;
		let newOption = Math.floor(e.target.name);
		if (option === newOption) {
			newOption = 'null';
		}
		this.setState({
			option: newOption
		});
	};

	changeMoney = async e => {
		let money = Math.floor(e.target.value);
		if (money < 0) {
			money = 0;
		}

		this.setState({
			money
		});
	};

	clickBet = async e => {
		const { MatchAction, userEmail, userMoney } = this.props;
		const { _id, option, money } = this.state;

		MatchAction.bet(_id, userEmail, option, money)
			.then(() => {
				// 유저 머니 차감
			})
			.catch(() => {
				// 배팅 실패 알림
			});
	};

	clickCancelBet = async e => {
		const { MatchAction, userEmail, userMoney } = this.props;
		const { _id } = this.state;
		MatchAction.cancelBet(_id, userEmail)
			.then(() => {
				// 유저 머니 회복
			})
			.catch(() => {
				// 배팅 캔슬 실패 알림
			});
	};

	updateMatch = async (id, update, index) => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.updateMatch(id, update);
			await this.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err!');
		}
	};

	render() {
		const { option, money, isBet } = this.state;
		const { match } = this.props;
		const { home, away, bettingOptions, bettingState, category, date, bettingUsers } = match;
		return (
			<div className="matchItem">
				<div>{date}</div>
				<div>{`${home} ${away}`}</div>
				{!isBet ? (
					<div id="beforeBet">
						<div>
							{bettingOptions.map((o, i) => (
								<button
									type="button"
									key={i}
									name={i}
									className={i === option ? 'bettingOption pick' : 'bettingOption'}
									onClick={this.clickBettingOption}
								>
									{`${o.winner} ${o.winnerScore} vs ${o.looserScore} ${o.looser}`}
								</button>
							))}
						</div>
						<input type="number" value={money} onChange={this.changeMoney} />
						<button type="button" onClick={this.clickBet}>{`${money}원 배팅하기`}</button>
					</div>
				) : (
					<div id="afterBet">
						<button type="button">취소하기</button>
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchList: state.match.matchList,
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption,
		userEmail: state.user.email,
		userMoney: state.user.money
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatchItem);
