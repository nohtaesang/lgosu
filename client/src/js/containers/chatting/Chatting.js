import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './chatting.css';

class ConnectedChatting extends Component {
	render() {
		return (
			<div id="chatting" className="container">
				<div>add match</div>
				<div>matchlist</div>
			</div>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({})
)(ConnectedChatting);
