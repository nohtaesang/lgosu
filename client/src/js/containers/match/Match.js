import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MatchAddForm from './MatchAddForm';
import Tab from './Tab';
import MatchList from './MatchList';
// import * as commonAction from '../../modules/common';
import './match.css';

class ConnectedMatch extends Component {
	render() {
		const { isAdmin } = this.props;
		return (
			<div id="match" className="container">
				<MatchAddForm />
				<Tab />
				<MatchList />
			</div>
		);
	}
}

export default connect(
	state => ({
		isAdmin: state.common.isAdmin
	}),
	dispatch => ({})
)(ConnectedMatch);
