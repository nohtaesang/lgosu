import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import MatchItem from './MatchItem';

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

class ConnectedMatchList extends Component {
	componentDidMount() {
		this.getMatchList();
	}

	// componentWillReceiveProps(nextProps) {
	//     if (this.props.numberOfMatches !== nextProps.numberOfMatches) {
	//         // this.getMatchList(nextProps.numberOfMatches);
	//     }
	// }

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
					? this.props.matchList.map((match, i) => (
						<MatchItem
							key={match._id}
							match={match}
							home={this.initTeamInfo(match.home)}
							away={this.initTeamInfo(match.away)}
						/>
					  ))
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
