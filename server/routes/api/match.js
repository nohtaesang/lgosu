const Match = require('../../models/Match');

module.exports = app => {
	app.post('/addMatch', (req, res, next) => {
		Match.create(req.body)
			.then(match => res.send(match))
			.catch(err => res.status(500).send(err));
	});

	// option에 맞는 매치를 numberOfMatches 만큼 가져온다
	app.post('/match/getMatchList', (req, res, next) => {
		const { numberOfMatches, option } = req.body;

		Match.find({ bettingState: option }, function(err, matchList) {
			if (err) return res.status(500).send({ error: 'database failure' });
			res.json(matchList);
		})
			.limit(numberOfMatches)
			.sort({ _id: -1 });
	});

	// match를 지운다.
	app.post('/match/deleteMatch', (req, res, next) => {
		const { id } = req.body;
		Match.deleteOne({ _id: id }, err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		});
	});

	// match를 업데이트한다.
	app.post('/match/updateMatch', (req, res, next) => {
		const { id, update } = req.body;
		Match.updateOne({ _id: id }, update, err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		});
	});

	// match의 bettingUsers에 정보를 추가시킨다.
	app.post('/match/bet', (req, res, next) => {
		const { id, userEmail, option, betMoney } = req.body;
		Match.findOne(
			{
				_id: id
			},
			{ bettingUsers: { $elemMatch: { userEmail: userEmail } } },
			(err, match) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				if (match.bettingUsers.length !== 0) {
					return res.status(404).json({ error: 'is already exist' });
				}

				match.updateOne(
					{ $push: { bettingUsers: { userEmail: userEmail, option: option, betMoney: betMoney } } },
					(err, match) => {
						if (err) {
							return res.status(500).json({ error: err });
						}
						if (!match) {
							return res.status(404).json({ error: 'match not found' });
						}
						return res.json(match);
					}
				);
			}
		);
	});

	// match의 bettingUsers에 userEmail에 맞는 값을 삭제한다.
	app.post('/match/cancelBet', (req, res, next) => {
		const { id, userEmail } = req.body;
		Match.findOne(
			{
				_id: id
			},
			{ bettingUsers: { $elemMatch: { userEmail: userEmail } } },
			(err, match) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				if (match.bettingUsers.length === 0) {
					return res.status(404).json({ error: 'is not exist' });
				}
				match.updateOne({ $pull: { bettingUsers: { userEmail: userEmail } } }, (err, match) => {
					if (err) {
						return res.status(500).json({ error: err });
					}
					if (!match) {
						return res.status(404).json({ error: 'match not found' });
					}
					return res.json(match);
				});
			}
		);
	});

	//
	app.post('/match/setDividend', (req, res) => {
		const { id, dividendMoney, dividendRate } = req.body;
		Match.updateOne(
			{
				_id: id
			},
			{ $set: { dividendMoney: dividendMoney, dividendRate, dividendRate } },
			err => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true });
			}
		);
	});
};
