module.exports = app => {
	app.get('/naverLogin', (req, res, next) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const redirectURI = encodeURI('http://54.81.41.223:3000/');
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

	app.get('/naverLoginCallBack', (req, res) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const client_secret = 'ZP1elynjbC';
		const redirectURI = encodeURI('http://54.81.41.223:3000/');
		const code = req.query.code;
		const state = req.query.state;
		// console.log(req);
		console.log('**************1');
		console.log(req.query);
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
			url: api_url,
			headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
		};
		request.get(options, (err, res, body) => {
			console.log('**************2');
			console.log(res);
			console.log('**************3');
			console.log(body);
			// if (!err && res.statusCode === 200) {

			// }
		});
		// request.get(options, function (error, response, body) {
		//   if (!error && response.statusCode == 200) {
		//     res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
		//     res.end(body);
		//   } else {
		//     res.status(response.statusCode).end();
		//     console.log('error = ' + response.statusCode);
		//   }
		// }
	});
};
