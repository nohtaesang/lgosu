module.exports = app => {
	app.post('/naverLogin', (req, res, next) => {
		const client_id = 'WyI9Zt0DgUshOZRrcaaL';
		const redirectURI = encodeURI('http://54.81.41.223:3000/');
		var state = 'RAMDOM_STATE';
		naverLoginUrl =
			'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
			client_id +
			'&redirect_uri=' +
			redirectURI +
			'&state=' +
			state;
		return res.json({ naverLoginUrl });
	});
};
