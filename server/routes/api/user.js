module.exports = app => {
	// app.get('/naverLogin', (req, res, next) => {
	// 	const client_id = 'WyI9Zt0DgUshOZRrcaaL';
	// 	const redirectURI = encodeURI('http://54.81.41.223:3001/naverLoginCallBack');
	// 	var state = 'RAMDOM_STATE';
	// 	const naverLoginUrl =
	// 		'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
	// 		client_id +
	// 		'&redirect_uri=' +
	// 		redirectURI +
	// 		'&state=' +
	// 		state;
	// 	return res.json({ naverLoginUrl });
	// });
	// app.get('/naverLoginCallBack', (req, res) => {
	// 	const client_id = 'WyI9Zt0DgUshOZRrcaaL';
	// 	const client_secret = 'ZP1elynjbC';
	// 	const redirectURI = encodeURI('http://54.81.41.223:3001/naverLoginCallBack');
	// 	const code = req.query.code;
	// 	const state = req.query.state;
	// 	const naverLoginUrl =
	// 		'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
	// 		client_id +
	// 		'&client_secret=' +
	// 		client_secret +
	// 		'&redirect_uri=' +
	// 		redirectURI +
	// 		'&code=' +
	// 		code +
	// 		'&state=' +
	// 		state;
	// 	const request = require('request');
	// 	const options = {
	// 		url: naverLoginUrl,
	// 		headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
	// 	};
	// 	request.get(options, (error, response, body) => {
	// 		if (!error && response.statusCode === 200) {
	// 			res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
	// 			res.end(body);
	// 		} else {
	// 			res.statusCode(response.statusCode).end();
	// 			console.log('error = ' + response.statusCode);
	// 		}
	// 	});
	// });
	app.get('/getUserInfo', (req, res, next) => {
		console.log('a');
		const api_url = 'https://openapi.naver.com/v1/nid/me';
		const { token } = req.body;
		const header = 'Bearer ' + token;
		const request = require('request');
		let options = {
			url: api_url,
			headers: { Authorization: header }
		};
		console.log('b');
		request.get(options, (err, response, body) => {
			if (!err && response.statusCode === 200) {
				console.log('c');
				console.log(body);
				return res.json({ body });
			} else {
				console.log('d');
				console.log(err);
			}
		});
		console.log('f');
	});
};
