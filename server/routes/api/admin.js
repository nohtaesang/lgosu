const Match = require("../../models/Match");

module.exports = app => {
  app.post("/api/admin/addMatch", (req, res, next) => {
    Match.create(req.body)
      .then(match => res.send(match))
      .catch(err => res.status(500).send(err));
  });

  app.post("/api/admin/loadMatchList", (req, res, next) => {
    const { numberOfMatches } = req.body;

    Match.find(function(err, matchList) {
      if (err) return res.stauts(500).send({ error: "database failure" });
      res.json(matchList);
    })
      .limit(numberOfMatches)
      .sort({ _id: -1 });
  });

  app.post("/api/admin/deleteMatch", (req, res, next) => {
    const { id } = req.body;
    Match.deleteOne({ _id: id }, err => {
      if (err) return res.json({ sucess: false, error: err });
      return res.json({ sucess: true });
    });
  });

  app.post("/api/admin/updateMatch", (req, res, next) => {
    const { id, update } = req.body;
    Match.updateOne({ _id: id }, update, err => {
      if (err) return res.json({ sucess: false, error: err });
      return res.json({ sucess: true });
    });
  });
};
