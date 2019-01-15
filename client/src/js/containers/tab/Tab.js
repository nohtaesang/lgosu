import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

import './tab.css';

class Tab extends Component {
	clickMatchOption = async e => {
		const { MatchAction } = this.props;
		const option = parseInt(e.target.name, 10);

		if (option <= 2) {
			try {
				await MatchAction.getMatchList(10, option);
			} catch (err) {
				console.log(err);
			}
		} else {
			await MatchAction.resetMatchList();
		}
		await MatchAction.setMatchOption(option);
	};

	render() {
		const matchOption = parseInt(this.props.matchOption, 10);
		return (
			<div id="tab">
				<button
					type="button"
					className={matchOption === 0 ? 'pick' : null}
					name="0"
					onClick={this.clickMatchOption}
				>
					{'진행중'}
				</button>
				<button
					type="button"
					className={matchOption === 1 ? 'pick' : null}
					name="1"
					onClick={this.clickMatchOption}
				>
					{'경기중'}
				</button>
				<button
					type="button"
					className={matchOption === 2 ? 'pick' : null}
					name="2"
					onClick={this.clickMatchOption}
				>
					{'경기 종료'}
				</button>
				<button
					type="button"
					className={matchOption === 3 ? 'pick' : null}
					name="3"
					onClick={this.clickMatchOption}
				>
					{'나의 기록'}
				</button>
				<button
					type="button"
					className={matchOption === 4 ? 'pick' : null}
					name="4"
					onClick={this.clickMatchOption}
				>
					{'랭킹'}
				</button>
				<button
					type="button"
					className={matchOption === 5 ? 'pick' : null}
					name="5"
					onClick={this.clickMatchOption}
				>
					{'채팅하기'}
				</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		matchOption: state.match.matchOption
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(Tab);
