import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import MatchItem from './MatchItem';

class ConnectedMatchList extends Component {
	componentDidMount() {
		this.getMatchList();
	}

	// componentWillReceiveProps(nextProps) {
	//     if (this.props.numberOfMatches !== nextProps.numberOfMatches) {
	//         // this.getMatchList(nextProps.numberOfMatches);
	//     }
	// }

	getMatchList = async () => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err');
		}
	};

	getMoreMatchList = async () => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.getMoreMatchList();
			await MatchAction.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err');
		}
	};

	render() {
		const { matchList, numberOfMatches, loading } = this.props;
		return (
			<div id="matchList">
				{this.props.matchList
					? this.props.matchList.map((match, i) => <MatchItem key={match._id} match={match} />)
					: null}
				{loading ? <p>loading...</p> : null}
				{!loading && matchList.length === numberOfMatches ? (
					<button type="button" name="loadMore" onClick={this.getMoreMatchList}>
						{'loadMore'}
					</button>
				) : null}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchList: state.match.matchList,
		matchOption: state.match.matchOption,
		numberOfMatches: state.match.numberOfMatches,
		loading: state.pender.pending.GET_MATCH_LIST
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatchList);
