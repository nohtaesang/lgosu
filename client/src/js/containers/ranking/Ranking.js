import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ranking.css';

class ConnectedRanking extends Component {
	render() {
		return (
			<div id="ranking" className="container">
				<div>win rate</div>
				<div>money</div>
			</div>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({})
)(ConnectedRanking);
