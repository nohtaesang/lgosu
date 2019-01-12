import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import Tab from './Tab';
import BeforeMatchItem from './BeforeMatchItem';
import DuringMatchItem from './DuringMatchItem';

import ktLogo from './logo/logo_ktrolster.png';
import griffineLogo from './logo/logo_griffin_new.png';
import kingzoneLogo from './logo/logo_dragonx.png';
import gengLogo from './logo/logo_geng02.png';
import afreecaLogo from './logo/logo_afreecafreece.png';
import hanhwaLogo from './logo/logo_hanwha.png';
import sktLogo from './logo/logo_skt1.png';
import jinairLogo from './logo/logo_jinair.png';
import damwonLogo from './logo/logo_damwon.png';
import battlecomicsLogo from './logo/logo_battlecomics.png';
import AfterMatchItem from './AfterMatchItem';

class MatchList extends Component {
	componentDidMount() {}

	initTeamInfo = name => {
		let logo = '';
		let koName = '';
		switch (name) {
			case 'kt':
				logo = ktLogo;
				koName = '케이티 롤스터';
				break;
			case 'griffin':
				logo = griffineLogo;
				koName = '그리핀';
				break;
			case 'kingzone':
				logo = kingzoneLogo;
				koName = '킹존 드래곤 X';
				break;
			case 'geng':
				logo = gengLogo;
				koName = '젠지 이스포츠';
				break;
			case 'afreeca':
				logo = afreecaLogo;
				koName = '아프리카 프릭스';
				break;
			case 'hanhwa':
				logo = hanhwaLogo;
				koName = '한화생명 이스포츠';
				break;
			case 'skt':
				logo = sktLogo;
				koName = 'SKT T1';
				break;
			case 'jinair':
				logo = jinairLogo;
				koName = '진에어 그린윙스';
				break;
			case 'damwon':
				logo = damwonLogo;
				koName = '담원 게이밍';
				break;
			case 'battlecomics':
				logo = battlecomicsLogo;
				koName = '배틀코믹스';
				break;
			default:
				break;
		}
		return { logo, koName };
	};

	clickGetMoreMatches = async () => {
		const { MatchAction, numberOfMatches, matchOption } = this.props;
		await MatchAction.getMoreMatchList();
		await MatchAction.getMatchList(numberOfMatches + 10, matchOption);
	};

	render() {
		const { matchOption, matchList, numberOfMatches, loading } = this.props;
		return (
			<div id="matchList">
				<Tab />
				{matchOption === 0
					? matchList.map((m, i) => (
						<BeforeMatchItem
							key={i}
							match={m}
							home={this.initTeamInfo(m.home)}
							away={this.initTeamInfo(m.away)}
						/>
					  ))
					: null}
				{matchOption === 1
					? matchList.map((m, i) => (
						<DuringMatchItem
							key={i}
							match={m}
							home={this.initTeamInfo(m.home)}
							away={this.initTeamInfo(m.away)}
						/>
					  ))
					: null}
				{matchOption === 2
					? matchList.map((m, i) => (
						<AfterMatchItem
							key={i}
							match={m}
							home={this.initTeamInfo(m.home)}
							away={this.initTeamInfo(m.away)}
						/>
					  ))
					: null}
				{matchList.length === numberOfMatches ? (
					<button type="button" id="getMoreMatches" onClick={this.clickGetMoreMatches}>
						{'경기 더 불러오기'}
					</button>
				) : null}
			</div>
		);
	}
}

export default connect(
	state => ({
		matchOption: state.match.matchOption,
		matchList: state.match.matchList,
		numberOfMatches: state.match.numberOfMatches,
		loading: state.pender.pending.GET_MATCH_LIST
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(MatchList);
