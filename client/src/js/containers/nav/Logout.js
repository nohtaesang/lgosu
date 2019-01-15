import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userAction from '../../modules/user';
import naverLoginIcon from './icon/naver_logout_icon.PNG';

class Logout extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false
		};
	}

	// 토큰을 이용하여 유저의 이메일을 가져온다.
	// 출석을 확인하여 돈을 지급한다.
	componentDidMount() {
		const { UserAction } = this.props;
		UserAction.getUserInfoFromNaver(localStorage.token)
			.then(response => {
				UserAction.getUserInfo(this.props.userInfoFromNaver.email).then(res => {
					const { attendance, userMoney, maxMoney } = res.data;
					if (res.data.attendance === null) {
						alert('첫 가입 10000원 지급');
						UserAction.updateUser(this.props.userInfoFromNaver.email, { attendance: new Date() });
						UserAction.setUserMoney(res.data.userMoney);
						this.setState({ isLoading: true });
					} else {
						const beforeLoginDate = new Date(res.data.attendance);
						const curLoginDate = new Date();
						if (
							beforeLoginDate.getDate() !== curLoginDate.getDate()
							&& beforeLoginDate.getMonth() !== curLoginDate.getMonth()
						) {
							alert('출석 2000원 지급');
							UserAction.updateUser(this.props.userInfoFromNaver.email, {
								attendance: curLoginDate,
								userMoney: res.data.userMoney + 2000
							});
							UserAction.setUserMoney(res.data.userMoney + 2000);
							this.setState({ isLoading: true });
						}
					}
				});
			})
			.catch(() => {
				localStorage.clear();
				window.location.href = 'http://3.88.93.58:3000';
			});
	}

	// 로그아웃. localStorage 해제 및 store 에 있는 유저 관련 데이터 초기화, 페이지 리로드
	clickLogout = () => {
		this.setState({ isLoading: false });
		const { UserAction } = this.props;
		localStorage.clear();
		UserAction.clickLogout();
		window.location.href = 'http://3.88.93.58:3000';
	};

	render() {
		const { isLoading } = this.state;
		const { userMoney } = this.props;
		return isLoading ? (
			<div id="logout">
				<p>{this.props.userInfoFromNaver.nickname}</p>
				<p>{`${userMoney} 원`}</p>
				<div id="logoutBtn" onClick={this.clickLogout}>
					<img alt="" src={naverLoginIcon} />
				</div>
			</div>
		) : null;
	}
}

export default connect(
	state => ({
		userInfoFromNaver: state.user.userInfoFromNaver,
		userMoney: state.user.userMoney
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Logout);
