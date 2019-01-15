import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as teamAction from '../modules/team';

import ktRolsterLogo from '../../logo/logo_ktRolster.png';
import griffinLogo from '../../logo/logo_griffin.png';
import kingzoneDragonXLogo from '../../logo/logo_kingzoneDragonX.png';
import genGLogo from '../../logo/logo_genG.png';
import afreecaFreecsLogo from '../../logo/logo_afreecaFreecs.png';
import hanwhaLifeLogo from '../../logo/logo_hanwhaLife.png';
import skTelecomT1Logo from '../../logo/logo_skTelecomT1.png';
import jinAirGreenWingsLogo from '../../logo/logo_jinAirGreenWings.png';
import damwonGamingLogo from '../../logo/logo_damwonGaming.png';
import sandboxGamingLogo from '../../logo/logo_sandboxGaming.png';

class Team extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		const { TeamAction } = this.props;
		TeamAction.setTeamInfo(this.initTeamInfo());
	}

	initTeamInfo = () => {
		const teamInfo = [
			{ enName: 'ktRolster', koName: '케이티 롤스터', logo: ktRolsterLogo },
			{ enName: 'griffin', koName: '그리핀', logo: griffinLogo },
			{ enName: 'kingzoneDragonX', koName: '킹존 드래곤 X', logo: kingzoneDragonXLogo },
			{ enName: 'genG', koName: '젠지', logo: genGLogo },
			{ enName: 'afreecaFreecs', koName: '아프리카 프릭스', logo: afreecaFreecsLogo },
			{ enName: 'hanwhaLife', koName: '한화 생명', logo: hanwhaLifeLogo },
			{ enName: 'skTelecomT1', koName: 'SK Telecom T1', logo: skTelecomT1Logo },
			{ enName: 'jinAirGreenWings', koName: '진에어 그린윙스', logo: jinAirGreenWingsLogo },
			{ enName: 'damwonGaming', koName: '담원 게이밍', logo: damwonGamingLogo },
			{ enName: 'sandboxGaming', koName: '샌드박스 게이밍', logo: sandboxGamingLogo }
		];
		return teamInfo;
	};

	render() {
		return <div id="team" />;
	}
}

export default connect(
	state => ({
		teamInfo: state.team.teamInfo
	}),
	dispatch => ({
		TeamAction: bindActionCreators(teamAction, dispatch)
	})
)(Team);
