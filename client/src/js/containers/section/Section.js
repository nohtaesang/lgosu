import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MatchList from '../matchList/MatchList';
import Admin from '../admin/Admin';
import MyRecord from '../myRecord/MyRecord';
import './section.css';
import * as matchAction from '../../modules/match';

class Section extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			isAdmin: false
		};
	}

	componentDidMount() {
		const { MatchAction, matchOption, numberOfMatches } = this.props;
		MatchAction.getMatchList(numberOfMatches, matchOption);
	}

	render() {
		const { userInfoFromNaver, matchOption } = this.props;
		return userInfoFromNaver ? (
			<div id="section" className="container">
				{matchOption <= 2 ? <MatchList /> : null}
				{userInfoFromNaver.email === 'nohtaesang@naver.com' && matchOption <= 2 ? <Admin /> : null}
				{matchOption === 3 ? <MyRecord /> : null}
				{matchOption === 4 ? <h1>준비중입니다...(소지금, 승률)</h1> : null}
				{matchOption === 5 ? <h1>준비중입니다...</h1> : null}
			</div>
		) : (
			<div id="section" className="container">
				{matchOption <= 2 ? <MatchList /> : null}
				{matchOption === 3 ? <h1>로그인 후 이용해 주세요</h1> : null}
				{matchOption === 4 ? <h1>준비중입니다...(소지금, 승률)</h1> : null}
				{matchOption === 5 ? <h1>준비중입니다...</h1> : null}
			</div>
		);
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
)(Section);
