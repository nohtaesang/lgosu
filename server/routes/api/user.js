const User = require('../../models/User');

module.exports = app => {
	// 네이버 로그인 url을 리턴한다.
	app.get('/user/getNaverLoginUrl', (req, res, next) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const redirectURI = encodeURI('http://3.88.93.58:3001/user/callback');
		var state = 'RAMDOM_STATE';
		const naverLoginUrl =
			'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
			client_id +
			'&redirect_uri=' +
			redirectURI +
			'&state=' +
			state;

		return res.json({ naverLoginUrl });
	});

	app.get('/user/callback', (req, res) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const client_secret = 'ZP1elynjbC';
		const redirectURI = encodeURI('http://3.88.93.58:3000/');
		const code = req.query.code;
		const state = req.query.state;
		const naverLoginUrl =
			'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
			client_id +
			'&client_secret=' +
			client_secret +
			'&redirect_uri=' +
			redirectURI +
			'&code=' +
			code +
			'&state=' +
			state;
		const request = require('request');
		const options = {
			url: naverLoginUrl,
			headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
		};

		request.post(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const { access_token } = JSON.parse(body);
				res.statusCode = 302;
				res.setHeader('Location', 'http://3.88.93.58:3000/?token=' + access_token);
				res.end();
			} else {
				res.statusCode(response.statusCode).end();
				console.log('error = ' + response.statusCode);
			}
		});
	});

	// 토큰을 이용하여 사용자에 대한 정보를 리턴한다.
	app.post('/user/getUserInfoFromNaver', (req, res, next) => {
		const { token } = req.body;
		const api_url = 'https://openapi.naver.com/v1/nid/me';
		const header = 'Bearer ' + token;
		const request = require('request');
		const options = {
			url: api_url,
			headers: { Authorization: header }
		};

		request.get(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				return res.json(JSON.parse(body));
			} else {
				return res.json({ success: false });
			}
		});
	});

	// 유저의 정보를 update 시킨다.
	app.post('/user/updateUser', (req, res, next) => {
		const { userEmail, update } = req.body;
		User.updateOne({ userEmail }, update, err => {
			if (err) {
				return res.json({ success: false, error: err });
			}
			return res.json({ update });
		});
	});

	//  유저의 돈을 증감시킨다
	app.post('/user/changeUserMoney', (req, res) => {
		const { userEmail, money } = req.body;
		User.updateOne(
			{
				userEmail
			},
			{ $inc: { userMoney: money } },
			err => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ money });
			}
		);
	});

	// bettingResults 에 결과를 추가한다
	app.post('/user/insertBettingResults', (req, res, next) => {
		const {
			userEmail,
			id,
			category,
			date,
			home,
			away,
			myPrediction,
			myDividendRate,
			myMoney,
			resultPrediction,
			resultDividendRate,
			resultMoney
		} = req.body;
		User.findOne(
			{
				userEmail
			},
			{ bettingResults: { $elemMatch: { id: id } } },
			(err, user) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				if (user.bettingResults.length !== 0) {
					return res.status(404).json({ error: 'is already exist' });
				}

				user.updateOne(
					{
						$push: {
							bettingResults: {
								id,
								category,
								date,
								home,
								away,
								myPrediction,
								myDividendRate,
								myMoney,
								resultPrediction,
								resultDividendRate,
								resultMoney
							}
						}
					},
					(err, user) => {
						if (err) {
							return res.status(500).json({ error: err });
						}
						if (!user) {
							return res.status(404).json({ error: 'user not found' });
						}
						return res.json(user);
					}
				);
			}
		);
	});

	// 유저의 정보를 가져온다
	app.post('/user/getUserInfo', (req, res, next) => {
		const { userEmail } = req.body;

		User.findOne({ userEmail }, (err, user) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			if (user === null) {
				User.create({ userEmail, userMoney: 10000 });
				return res.json({ userMoney: 10000 });
			} else {
				return res.json(user);
			}
		});
	});

	// 유저가 없으면 등록하고 있음면 money를 리턴한다.
	// app.post('/user/getUserInfoFromDB', (req, res) => {
	// 	const { userEmail } = req.body;
	// 	User.findOne(
	// 		{
	// 			userEmail
	// 		},
	// 		(err, user) => {
	// 			if (err) {
	// 				return res.status(500).json({ error: err });
	// 			}

	// 			if (user === null) {
	// 				User.create({ userEmail, userMoney: 10000 });
	// 				return res.json({ userMoney: 10000 });
	// 			} else {
	// 				return res.json({ userMoney: user.userMoney });
	// 			}
	// 		}
	// 	);
	// });

	// bettingResults로 통계를 내어 유저 값에 저장..?

	// // bettingList에 id와 같은 값을 삭제한다
	// app.post('/user/deleteBettingList', (req, res, next) => {
	// 	const { userEmail, id } = req.body;
	// 	User.findOne(
	// 		{
	// 			userEmail
	// 		},
	// 		{ bettingList: { $elemMatch: { id: id } } },
	// 		(err, user) => {
	// 			if (err) {
	// 				return res.status(500).json({ error: err });
	// 			}
	// 			if (user.bettingList.length === 0) {
	// 				return res.status(404).json({ error: 'is not exist' });
	// 			}
	// 			user.updateOne({ $pull: { bettingList: { id: id } } }, (err, user) => {
	// 				if (err) {
	// 					return res.status(500).json({ error: err });
	// 				}
	// 				if (!user) {
	// 					return res.status(404).json({ error: 'user not found' });
	// 				}
	// 				return res.json(user);
	// 			});
	// 		}
	// 	);
	// });
};
