import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';

class ConnectedMatchAddForm extends Component {
	constructor() {
		super();
		this.state = {
			date: '',
			time: '',
			home: '',
			away: '',
			maxSet: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	addMatch = async () => {
		const { MatchAction, numberOfMatches, matchOption } = this.props;
		const { date, time, home, away, maxSet } = this.state;
		try {
			await MatchAction.addMatch(date, time, home, away, maxSet);
			await MatchAction.getMatchList(numberOfMatches, matchOption);
			await this.setState({
				date: '',
				time: '',
				home: '',
				away: '',
				maxSet: ''
			});
		} catch (e) {
			console.log('err');
		}
	};

	handleChange(e) {
		const { name, value } = e.target;
		switch (name) {
			case 'date':
				this.setState({ date: value });
				break;
			case 'time':
				this.setState({ time: value });
				break;
			case 'home':
				this.setState({ home: value });
				break;
			case 'away':
				this.setState({ away: value });
				break;
			case 'maxSet':
				this.setState({ maxSet: value });
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div id="matchAddForm">
				<input
					type="date"
					name="date"
					onChange={this.handleChange}
					value={this.state.date}
				/>
				<input
					type="time"
					name="time"
					onChange={this.handleChange}
					value={this.state.time}
				/>
				<select
					onChange={this.handleChange}
					name="home"
					value={this.state.home}
				>
					<option value="">home</option>
					<option value="kt">케이티</option>
					<option value="griffin">그리핀</option>
					<option value="kingzone">킹존</option>
					<option value="geng">젠지</option>
					<option value="afreeca">아프리카</option>
					<option value="hanhwa">한화</option>
					<option value="skt">SKT</option>
					<option value="jinair">진에어</option>
					<option value="damwon">담원</option>
					<option value="battlecomics">배틀코믹스</option>
				</select>
				<select
					onChange={this.handleChange}
					name="away"
					value={this.state.away}
				>
					<option value="">away</option>
					<option value="kt">케이티</option>
					<option value="griffin">그리핀</option>
					<option value="kingzone">킹존</option>
					<option value="geng">젠지</option>
					<option value="afreeca">아프리카</option>
					<option value="hanhwa">한화</option>
					<option value="skt">SKT</option>
					<option value="jinair">진에어</option>
					<option value="damwon">담원</option>
					<option value="battlecomics">배틀코믹스</option>
				</select>
				<select
					onChange={this.handleChange}
					name="maxSet"
					value={this.state.maxSet}
				>
					<option value="">maxSet</option>
					<option value="3">3</option>
					<option value="5">5</option>
				</select>
				<button type="submit" onClick={() => this.addMatch()}>
					{'등록'}
				</button>
			</div>
		);
	}
}

export default connect(
	state => ({
		numberOfMatches: state.match.numberOfMatches,
		matchOption: state.match.matchOption
	}),
	dispatch => ({
		MatchAction: bindActionCreators(matchAction, dispatch)
	})
)(ConnectedMatchAddForm);
