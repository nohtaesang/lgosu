const Match = require('../../models/Match');

module.exports = (app) => {
	app.post('/addMatch', (req, res, next) => {
		console.log(req.body);
		Match.create(req.body).then((match) => res.send(match)).catch((err) => res.status(500).send(err));
	});

	app.post('/getMatchList', (req, res, next) => {
		const { numberOfMatches, option } = req.body;

		Match.find({ bettingState: option }, function(err, matchList) {
			if (err) return res.stauts(500).send({ error: 'database failure' });
			res.json(matchList);
		})
			.limit(numberOfMatches)
			.sort({ _id: -1 });
	});

	app.post('/deleteMatch', (req, res, next) => {
		const { id } = req.body;
		Match.deleteOne({ _id: id }, (err) => {
			if (err) return res.json({ sucess: false, error: err });
			return res.json({ sucess: true });
		});
	});

	app.post('/updateMatch', (req, res, next) => {
		const { id, update } = req.body;
		Match.updateOne({ _id: id }, update, (err) => {
			if (err) return res.json({ sucess: false, error: err });
			return res.json({ sucess: true });
		});
	});

	app.post('/betting', (req, res, next) => {
		const { id, userEmail, option, money } = req.body;

		Match.findOne(
			{
				_id: id
			},
			{ bettingUsers: { $elemMatch: { userEmail: userEmail } } },
			(err, match) => {
				if (err) {
					return res.status(500).json({ error: err });
				}

				if (match.userBettingInfo.length) {
					return res.status(404).json({ error: 'is already exist' });
				}

				match.updateOne(
					{ $push: { bettingUsers: { userEmail: userEmail, option: option, money } } },
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
};
