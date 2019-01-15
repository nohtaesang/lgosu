import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import BeforeMatchItem from './BeforeMatchItem';
import DuringMatchItem from './DuringMatchItem';
import AfterMatchItem from './AfterMatchItem';

import './matchList.css';
import NonUserMatchItem from './NonUserMatchItem';

class MatchList extends Component {
	clickGetMoreMatches = async () => {
		const { MatchAction, numberOfMatches, matchOption } = this.props;
		await MatchAction.getMoreMatchList();
		await MatchAction.getMatchList(numberOfMatches + 10, matchOption);
	};

	render() {
		const { userInfoFromNaver, matchOption, matchList, numberOfMatches, loading } = this.props;
		console.log(userInfoFromNaver);
		return userInfoFromNaver ? (
			<div id="matchList">
				{matchOption === 0 ? matchList.map((m, i) => <BeforeMatchItem key={i} match={m} />) : null}
				{matchOption === 1 ? matchList.map((m, i) => <DuringMatchItem key={i} match={m} />) : null}
				{matchOption === 2 ? matchList.map((m, i) => <AfterMatchItem key={i} match={m} />) : null}
				{matchList.length === numberOfMatches ? (
					<button type="button" id="getMoreMatches" onClick={this.clickGetMoreMatches}>
						{'경기 더 불러오기'}
					</button>
				) : null}
			</div>
		) : (
			<div id="matchList">
				{matchList.map((m, i) => (
					<NonUserMatchItem key={i} match={m} />
				))}
			</div>
		);
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.match.userInfoFromNaver,
		matchOption: state.match.matchOption,
		matchList: state.match.matchList,
		numberOfMatches: state.match.numberOfMatches,
		loading: state.pender.pending.GET_MATCH_LIST
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(MatchList);
