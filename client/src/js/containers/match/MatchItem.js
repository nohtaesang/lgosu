import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

class ConnectedMatchItem extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentWillMount() {
		// this.state의 배팅 정보들을 불러와야 함
		// console.log(this.state);
	}

	deleteMatch = async (id) => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.deleteMatch(id);
			await this.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err');
		}
	};

	getMatchList = async () => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err');
		}
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
		// console.log(this.state);
		const { match } = this.props;
		const { isAdmin, players, user } = match;
		const { toggleDispPrediction, winner, winnerMoney } = this.state;
		const { date, home, away } = match;
		const newDate = new Date(match.date);
		console.log(match);
		return <div className="matchItem">z</div>;
	}
}

export default connect(
	(state) => ({
		matchList: state.match.matchList,
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption,
		isAdmin: state.common.isAdmin,
		players: state.match.players,
		user: state.common.user
	}),
	(dispatch) => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatchItem);
