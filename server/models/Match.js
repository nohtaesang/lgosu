var mongoose = require("mongoose");

var MatchSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  home: { type: String },
  away: { type: String },
  maxSet: { type: Number },
  winnerPredictions: [
    new mongoose.Schema(
      {
        userEmail: { type: String },
        winner: { type: String },
        money: { type: Number }
      },
      { _id: false }
    )
  ],
  scorePredictions: [
    new mongoose.Schema(
      {
        userEmail: { type: String },
        score: { type: String },
        money: { type: Number }
      },
      { _id: false }
    )
  ],
  bettingEnd: { type: Boolean, default: false },
  matchEnd: { type: Boolean, default: false }
});

MatchSchema.statics.create = function(payload) {
  const match = new this(payload);
  return match.save();
};

module.exports = mongoose.model("Match", MatchSchema);
