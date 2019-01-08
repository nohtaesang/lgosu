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
		const matchOption = parseInt(this.props.matchOption, 10);
		return (
			<div id="tab">
				<button
					type="button"
					className={matchOption === 0 ? 'pick' : null}
					onClick={() => this.setMatchOption(0)}
				>
					{'진행중'}
				</button>
				<button
					type="button"
					className={matchOption === 1 ? 'pick' : null}
					onClick={() => this.setMatchOption(1)}
				>
					{'경기중'}
				</button>
				<button
					type="button"
					className={matchOption === 2 ? 'pick' : null}
					onClick={() => this.setMatchOption(2)}
				>
					{'경기 종료'}
				</button>
				<button
					type="button"
					className={matchOption === 3 ? 'pick' : null}
					onClick={() => this.setMatchOption(3)}
				>
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
