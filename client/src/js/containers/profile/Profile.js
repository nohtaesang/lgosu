import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonAction from '../../modules/common';
import './profile.css';

class ConnectedProfile extends Component {
	render() {
		return (
			<div id="profile" className="container">
				<div>nickname</div>
				<div>money</div>
				<div>win rate</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		user: state.common.user
	}),
	dispatch => ({
		CommonAction: bindActionCreators(commonAction, dispatch)
	})
)(ConnectedProfile);
