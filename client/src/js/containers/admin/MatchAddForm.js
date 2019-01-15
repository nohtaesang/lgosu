import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../modules/match';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

class MatchAddForm extends Component {
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
		let dividendMoney = [];
		if (category === 'lck') {
			bettingOptions = bettingOptions.concat([
				{ winner: home, looser: away, homeScore: 2, awayScore: 0, money: 0 },
				{ winner: home, looser: away, homeScore: 2, awayScore: 1, money: 0 },
				{ winner: away, looser: home, homeScore: 0, awayScore: 2, money: 0 },
				{ winner: away, looser: home, homeScore: 1, awayScore: 2, money: 0 }
			]);
			dividendMoney = dividendMoney.concat([1000], [1000], [1000], [1000]);
		}

		try {
			await MatchAction.addMatch(category, newDate, home, away, bettingOptions, dividendMoney);
			await MatchAction.getMatchList(numberOfMatches, matchOption);
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
				<select id="inputCategory" onChange={this.handleChange} name="category" value={this.state.category}>
					<option value="">category</option>
					<option value="lck">LCK</option>
				</select>
				<DatePicker id="inputDate" selected={this.state.date} onChange={this.handleDateChange} />
				<input id="inputHour" onChange={this.handleChange} type="number" name="hour" value={this.state.hour} />
				<select id="inputHome" onChange={this.handleChange} name="home" value={this.state.home}>
					<option value="">home</option>
					<option value="ktRolster">케이티 롤스터</option>
					<option value="griffin">그리핀</option>
					<option value="kingzoneDragonX">킹존 드래곤 X</option>
					<option value="genG">젠지</option>
					<option value="afreecaFreecs">아프리카 프릭스</option>
					<option value="hanwhaLife">한화 생명</option>
					<option value="skTelecomT1">SKT Telecom T1</option>
					<option value="jinAirGreenWings">진에어 그린윙스</option>
					<option value="damwonGaming">담원 게이밍</option>
					<option value="sandboxGaming">샌드박스 게이밍</option>
				</select>
				<select id="inputAway" onChange={this.handleChange} name="away" value={this.state.away}>
					<option value="">away</option>
					<option value="ktRolster">케이티 롤스터</option>
					<option value="griffin">그리핀</option>
					<option value="kingzoneDragonX">킹존 드래곤 X</option>
					<option value="genG">젠지</option>
					<option value="afreecaFreecs">아프리카 프릭스</option>
					<option value="hanwhaLife">한화 생명</option>
					<option value="skTelecomT1">SKT Telecom T1</option>
					<option value="jinAirGreenWings">진에어 그린윙스</option>
					<option value="damwonGaming">담원 게이밍</option>
					<option value="sandboxGaming">샌드박스 게이밍</option>
				</select>
				<button id="inputAddMatchBtn" type="submit" onClick={() => this.addMatch()}>
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
)(MatchAddForm);
