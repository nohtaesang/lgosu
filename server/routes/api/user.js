const User = require('../../models/User');

module.exports = app => {
	app.get('/user/naverLogin', (req, res, next) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const redirectURI = encodeURI('http://14.39.199.54:3001/user/callback');
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
		const redirectURI = encodeURI('http://14.39.199.54:3000/');
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
				res.setHeader('Location', 'http://14.39.199.54:3000/?token=' + access_token);
				res.end();
			} else {
				res.statusCode(response.statusCode).end();
				console.log('error = ' + response.statusCode);
			}
		});
	});

	app.post('/getUserInfoFromNaver', (req, res, next) => {
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
				console.log(error);
			}
		});
	});

	app.post('/getUserInfoFromDB', (req, res) => {
		const { userEmail } = req.body;
		User.findOne(
			{
				email: userEmail
			},
			(err, user) => {
				if (err) {
					return res.status(500).json({ error: err });
				}

				if (user === null) {
					User.create({ email: userEmail, money: 10000 });
					return res.json({ money: 10000 });
				} else {
					return res.json({ money: user.money });
				}
			}
		);
	});

	app.post('/changeUserMoney', (req, res) => {
		const { userEmail, money } = req.body;
		User.updateOne(
			{
				email: userEmail
			},
			{ $set: { money: money } },
			err => {
				if (err) return res.json({ sucess: false, error: err });
				return res.json({ money });
			}
		);
	});
};
// Match.updateOne({ _id: id }, update, err => {
// 	if (err) return res.json({ sucess: false, error: err });
// 	return res.json({ sucess: true });
// });
