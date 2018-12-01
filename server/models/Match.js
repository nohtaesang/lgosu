var mongoose = require("mongoose");

var MatchSchema = new mongoose.Schema({
  day: { type: Number },
  home: { type: String },
  away: { type: String },
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
  isBettingEnd: { type: Boolean, default: false },
  isMatchEnd: { type: Boolean, default: false }
});

MatchSchema.statics.create = function(payload) {
  const match = new this(payload);
  return match.save();
};
// MatchSchema.statics.findAll = function() {
//   const match = new this.find();
//   return this.find();
// };

// MatchSchema.method.addMatch = function(info) {
//   this.push({
//     date: info.date,
//     home: info.home,
//     away: info.away,
//     winnerPredictions: [],
//     scorePredictions: [],
//     isBettingEnd: false,
//     isMatchEnd: false
//   });
//   return this.save();
// };

// MatchSchema.methods.addWinnerPredictions = function(info) {
//   this.winnerPredictions.push({
//     userEmail: info.userEmail,
//     winner: info.winner,
//     money: info.money
//   });
//   return this.save();
// };

// MatchSchema.methods.deleteWinnerPredictions = function(info) {
//   this.winnerPredictions.pull({
//     userEmail: info.userEmail
//   });
//   return this.save();
// };

// MatchSchema.methods.addScorePredictions = function(info) {
//   this.scorePredictions.push({
//     userEmail: info.userEmail,
//     score: info.score,
//     money: info.money
//   });
//   return this.save();
// };

// MatchSchema.methods.deleteScorePredictions = function(info) {
//   this.scorePredictions.pull({
//     userEmail: info.userEmail
//   });
//   return this.save();
// };

module.exports = mongoose.model("Match", MatchSchema);
