var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: { type: String },
	money: { type: Number },
	birthday: { type: String }
});

UserSchema.statics.create = function(payload) {
	const user = new this(payload);
	return user.save();
};

module.exports = mongoose.model('User', UserSchema);
