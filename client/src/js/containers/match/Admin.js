import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import AdminMatchItem from './AdminMatchItem';
import MatchAddForm from './MatchAddForm';
import Tab from './Tab';

class MatchList extends Component {
	componentDidMount() {}

	render() {
		const { matchList } = this.props;
		return (
			<div id="matchList">
				<MatchAddForm />
				<Tab />
				{matchList.map((m, i) => (
					<AdminMatchItem key={i} match={matchList[i]} />
				))}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchOption: state.match.matchOption,
		matchList: state.match.matchList,
		loading: state.pender.pending.GET_MATCH_LIST
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(MatchList);
