import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import * as userAction from '../../modules/user';

class ConnectedMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			_id: null,
			option: null,
			betMoney: 0,
			isBet: false
		};
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
	componentWillMount() {
		const { _id } = this.props.match;
		this.setState({
			_id
		});
	}

	componentDidMount() {
		const { match, userEmail } = this.props;
		const bettingUserIndex = match.bettingUsers.findIndex(info => info.userEmail === userEmail);

		if (bettingUserIndex === -1) {
			this.setState({
				isBet: false,
				betMoney: 0
			});
		} else {
			this.setState({
				isBet: true,
				betMoney: match.bettingUsers[bettingUserIndex].betMoney
			});
		}
	}

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

	changeBetMoney = async e => {
		const { userMoney } = this.props;
		let betMoney = Math.floor(e.target.value);
		if (betMoney < 0) {
			betMoney = 0;
		} else if (betMoney > Math.floor(userMoney)) {
			betMoney = Math.floor(userMoney);
		}

		this.setState({
			betMoney
		});
	};

	clickBet = async e => {
		const { MatchAction, UserAction, userEmail, userMoney } = this.props;
		const { isLoading, _id, option, betMoney } = this.state;

		if (isLoading || option === null || betMoney <= 0) return;
		try {
			this.setState({ isLoading: true });
			await MatchAction.bet(_id, userEmail, option, betMoney);
			await UserAction.changeUserMoney(userEmail, userMoney - betMoney);
			this.setState({
				isLoading: false,
				isBet: true
			});
		} catch (err) {
			console.log(err);
		}
	};

	clickCancelBet = async e => {
		const { MatchAction, UserAction, userEmail, userMoney, match } = this.props;
		const { isLoading, _id, betMoney } = this.state;

		if (isLoading) return;
		try {
			this.setState({ isLoading: true });
			await MatchAction.cancelBet(_id, userEmail);
			await UserAction.changeUserMoney(userEmail, userMoney + betMoney);
			this.setState({ isLoading: false, isBet: false });
		} catch (err) {
			console.log(err);
		}
	};

	updateMatch = async (id, update, index) => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.updateMatch(id, update);
			await this.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { option, betMoney, isBet } = this.state;
		const { match, home, away } = this.props;
		const { bettingOptions, bettingState, category, date, bettingUsers } = match;
		console.log(home);
		return (
			<div className="matchItem">
				<div className="date">{date}</div>
				<div className="teamLogo">
					{home ? <img className="homeLogo" alt="" src={home.logo} /> : null}
					{away ? <img className="awayLogo" alt="" src={away.logo} /> : null}
				</div>
				{!isBet ? (
					<div className="beforeBet">
						<div className="options">
							{bettingOptions.map((o, i) => (
								<button
									type="button"
									key={i}
									name={i}
									className={i === option ? 'bettingOption pick' : 'bettingOption'}
									onClick={this.clickBettingOption}
								>
									{`${o.homeScore} : ${o.awayScore}`}
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
						<button type="button" onClick={this.clickCancelBet}>
							{'취소하기'}
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
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption,
		userEmail: state.user.userEmail,
		userMoney: state.user.userMoney
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch),
		UserAction: bindActionCreators(userAction, dispatch)
	})
)(ConnectedMatchItem);
