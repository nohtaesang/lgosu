import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

class ConnectedMatchItem extends Component {
	constructor() {
		super();
		this.state = {
			toggleDispPrediction: false,
			winner: '',
			winnerMoney: 0,
			score: '',
			scoreMoney: 0,
			ace1: '',
			ace1Money: 0,
			ace2: '',
			ace2Money: 0,
			ace3: '',
			ace3Money: 0,
			ace4: '',
			ace4Money: 0,
			ace5: '',
			ace5Money: 0,
			ace6: '',
			ace6Money: 0,
			ace7: '',
			ace7Money: 0
		};
	}

	componentWillMount() {
		// this.state의 배팅 정보들을 불러와야 함
		console.log(this.state);
	}

	deleteMatch = async id => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.deleteMatch(id);
			await this.getMatchList(
				this.props.numberOfMatches,
				this.props.matchOption
			);
		} catch (e) {
			console.log('err');
		}
	};

	getMatchList = async () => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.getMatchList(
				this.props.numberOfMatches,
				this.props.matchOption
			);
		} catch (e) {
			console.log('err');
		}
	};

	updateMatch = async (id, update, index) => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.updateMatch(id, update);
			await this.getMatchList(
				this.props.numberOfMatches,
				this.props.matchOption
			);
		} catch (e) {
			console.log('err!');
		}
	};

	getPredictionScoreList = maxSet => {
		switch (maxSet) {
			case 3:
				return ['2:0', '2:1', '0:2', '1:2'];
			case 5:
				return ['3:0', '3:1', '3:2', '0:3', '1:3', '2:3'];
			case 7:
				return ['4:0', '4:1', '4:2', '4:3', '0:4', '1:4', '2:4', '3:4'];
			default:
				break;
		}
		return null;
	};

	onClickDispPrediction = () => {
		const { toggleDispPrediction } = this.state;
		this.setState({
			toggleDispPrediction: !toggleDispPrediction
		});
	};

	onClickTeam = e => {
		const { name, value } = e.target;
		switch (name) {
			case 'winner':
				this.setState({
					winner: value
				});
				break;
			case 'score':
				this.setState({
					score: value
				});
				break;
			case 'ace1':
				this.setState({
					ace1: value
				});
				break;
			case 'ace2':
				this.setState({
					ace2: value
				});
				break;
			case 'ace3':
				this.setState({
					ace3: value
				});
				break;
			case 'ace4':
				this.setState({
					ace4: value
				});
				break;
			case 'ace5':
				this.setState({
					ace5: value
				});
				break;
			case 'ace6':
				this.setState({
					ace6: value
				});
				break;
			case 'ace7':
				this.setState({
					ace7: value
				});
				break;
			default:
				break;
		}
	};

	onChangeMoney = e => {
		const { name, value } = e.target;
		switch (name) {
			case 'winner':
				this.setState({
					winnerMoney: value
				});
				break;
			case 'score':
				this.setState({
					scoreMoney: value
				});
				break;
			case 'ace1':
				this.setState({
					ace1Money: value
				});
				break;
			case 'ace2':
				this.setState({
					ace2Money: value
				});
				break;
			case 'ace3':
				this.setState({
					ace3Money: value
				});
				break;
			case 'ace4':
				this.setState({
					ace4Money: value
				});
				break;
			case 'ace5':
				this.setState({
					ace5Money: value
				});
				break;
			case 'ace6':
				this.setState({
					ace6Money: value
				});
				break;
			case 'ace7':
				this.setState({
					ace7Money: value
				});
				break;
			default:
				break;
		}
	};

	render() {
		console.log(this.state);
		const { index, isAdmin, players, user } = this.props;
		const {
			toggleDispPrediction,
			winnerPrediction,
			scorePrediction,
			acePrediction
		} = this.state;
		const match = this.props.matchList[index];
		const { date, time, home, away, maxSet } = match;
		const predictionScoreList = this.getPredictionScoreList(maxSet);
		const playerList = players[home].concat(players[away]);
		const aceTempArray = new Array(maxSet).fill(null);
		return (
			<div className="matchItem">
				<div className="info">
					<div className="infoLabel">
						{`${date.slice(5, 7)}/${date.slice(8, 10)} ${time.slice(
							0,
							2
						)}:${time.slice(3, 5)} ${home} vs ${away}`}
					</div>
					<button
						className="more-btn"
						type="button"
						onClick={this.onClickDispPrediction}
					>
						{'dispPrediction'}
					</button>
				</div>
				{toggleDispPrediction ? (
					<div className="disp-prediction">
						<div className="winner-prediction">
							<div className="prediction-label">승자 예측</div>
							<button
								type="button"
								name="winner"
								value={home}
								onClick={this.onClickTeam}
							>
								{home}
							</button>
							<button
								type="button"
								name="winner"
								value={away}
								onClick={this.onClickTeam}
							>
								{away}
							</button>
							<input
								type="number"
								name="winner"
								onChange={this.onChangeMoney}
							/>
							<button type="button">배팅 하기</button>
						</div>
						<div className="score-prediction">
							<div className="prediction-label">스코어 예측</div>
							{predictionScoreList.map((a, i) => (
								<button
									type="button"
									className="score-prediction-item"
									key={i}
									name="score"
									value={a}
									onClick={this.onClickTeam}
								>
									{`${home} ${a} ${away}`}
								</button>
							))}
							<input type="number" name="score" onChange={this.onChangeMoney} />
							<button type="button">배팅 하기</button>
						</div>
						{aceTempArray.map((temp, matchIndex) => (
							<div className="ace-prediction" key={matchIndex}>
								<div className="prediction-label">
									{`${matchIndex + 1} 경기 에이스 예측`}
								</div>
								{playerList.map((player, i) => (
									<button
										type="button"
										key={i}
										name={`ace${matchIndex + 1}`}
										value={player}
										onClick={this.onClickTeam}
									>
										{player}
									</button>
								))}
								<input
									type="number"
									name={`ace${matchIndex + 1}`}
									onChange={this.onChangeMoney}
								/>
								<button type="button">배팅 하기</button>
							</div>
						))}
					</div>
				) : null}

				{isAdmin ? (
					<div className="admin">
						<div>{`matchEnd=${match.matchEnd}`}</div>
						<div>{`bettingEnd=${match.bettingEnd}`}</div>
						<button
							type="button"
							name="matchEnd"
							className="matchEnd"
							onClick={() => this.updateMatch(
								match._id,
								{
									matchEnd: !match.matchEnd
								},
								index
							)
							}
							id={match._id}
						>
							{'matchEnd'}
						</button>
						<button
							type="button"
							name="deleteMatch"
							className="deleteMatchBtn"
							onClick={() => this.deleteMatch(match._id)}
							id={match._id}
						>
							{'deleteMatch'}
						</button>
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchList: state.match.matchList,
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption,
		isAdmin: state.common.isAdmin,
		players: state.match.players,
		user: state.common.user
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatchItem);
