import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

class ConnectedMatchAddForm extends Component {
	constructor() {
		super();
		this.state = {
			category: '',
			date: new Date(),
			hour: '',
			home: '',
			away: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	addMatch = async () => {
		const { MatchAction, numberOfMatches, matchOption } = this.props;
		const { category, date, hour, home, away } = this.state;
		const newDate = new Date(date.setHours(hour));
		let bettingOptions = [];

		if (category === 'lck') {
			bettingOptions = bettingOptions.concat([
				{ winner: home, looser: away, winnerScore: 2, looserScore: 0, money: 0 },
				{ winner: home, looser: away, winnerScore: 2, looserScore: 1, money: 0 },
				{ winner: away, looser: home, winnerScore: 2, looserScore: 0, money: 0 },
				{ winner: away, looser: home, winnerScore: 2, looserScore: 1, money: 0 }
			]);
		}

		try {
			await MatchAction.addMatch(category, newDate, home, away, bettingOptions);
			await MatchAction.getMatchList(numberOfMatches, matchOption);
			await this.setState({
				category: '',
				time: '',
				home: '',
				away: ''
			});
		} catch (e) {
			console.log('err');
		}
	};

	handleChange(e) {
		const { name, value } = e.target;
		switch (name) {
			case 'category':
				this.setState({ category: value });
				break;
			case 'hour':
				this.setState({ hour: value });
				break;
			case 'home':
				this.setState({ home: value });
				break;
			case 'away':
				this.setState({ away: value });
				break;
			default:
				break;
		}
	}

	handleDateChange(date) {
		const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

		this.setState({ date: newDate });
	}

	render() {
		return (
			<div id="matchAddForm">
				<select onChange={this.handleChange} name="category" value={this.state.category}>
					<option value="">category</option>
					<option value="lck">LCK</option>
				</select>
				<DatePicker selected={this.state.date} onChange={this.handleDateChange} />
				<input onChange={this.handleChange} type="number" name="hour" value={this.state.hour} />
				<select onChange={this.handleChange} name="home" value={this.state.home}>
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
				<select onChange={this.handleChange} name="away" value={this.state.away}>
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
