import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MatchList from './MatchList';
import Admin from './Admin';
import './match.css';
import * as matchAction from '../../modules/match';

class ConnectedMatch extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			isAdmin: false
		};
	}

	componentDidMount() {
		const { MatchAction, matchOption, numberOfMatches } = this.props;
		try {
			MatchAction.getMatchList(numberOfMatches, matchOption);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { userInfoFromNaver } = this.props;
		return userInfoFromNaver ? (
			<div id="match" className="container">
				<MatchList />

				{userInfoFromNaver.email === 'nohtaesang@naver.com' ? <Admin /> : null}
			</div>
		) : null;
	}
}

export default connect(
	state => ({
		matchOption: state.match.matchOption,
		numberOfMatches: state.match.numberOfMatches,
		userInfoFromNaver: state.user.userInfoFromNaver
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatch);
