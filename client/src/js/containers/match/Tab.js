import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

class ConnectedTab extends Component {
	setMatchOption = async option => {
		const { MatchAction } = this.props;
		try {
			await MatchAction.setMatchOption(option);
			await MatchAction.getMatchList(this.props.numberOfMatches, this.props.matchOption);
		} catch (e) {
			console.log('err');
		}
	};

	render() {
		return (
			<div id="tab">
				<button type="button" onClick={() => this.setMatchOption(0)}>
					{'진행중'}
				</button>
				<button type="button" onClick={() => this.setMatchOption(1)}>
					{'경기중'}
				</button>
				<button type="button" onClick={() => this.setMatchOption(2)}>
					{'경기 종료'}
				</button>
				<button type="button" onClick={() => this.setMatchOption(3)}>
					{'전체 경기'}
				</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedTab);
