var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userEmail: { type: String },
	userMoney: { type: Number },
	bettingResults: { type: Array },
	win: { type: Number, default: 0 },
	lose: { type: Number, default: 0 },
	winningRate: { type: Number, default: 0 },
	maxDividendRate: { type: Number, default: 0 },
	maxGetMoney: { type: Number, default: 0 },
	maxMoney: { type: Number, default: 10000 }
});

UserSchema.statics.create = function(payload) {
	const user = new this(payload);
	return user.save();
};

module.exports = mongoose.model('User', UserSchema);
