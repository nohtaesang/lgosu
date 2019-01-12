var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
	category: { type: String },
	date: { type: String },
	home: { type: String },
	away: { type: String },
	bettingState: { type: Number, default: 0 },
	bettingOptions: { type: Array },
	bettingUsers: { type: Array },
	dividendMoney: { type: Array },
	result: { type: Number, default: null }
});

MatchSchema.statics.create = function(payload) {
	const match = new this(payload);
	return match.save();
};

module.exports = mongoose.model('Match', MatchSchema);
