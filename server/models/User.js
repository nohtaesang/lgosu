var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	userEmail: { type: String },
	userMoney: { type: Number },
	bettingList: { type: Array }
});

UserSchema.statics.create = function(payload) {
	const user = new this(payload);
	return user.save();
};

module.exports = mongoose.model('User', UserSchema);
