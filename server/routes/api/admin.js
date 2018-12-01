const Match = require("../../models/Match");

module.exports = app => {
  app.post("/api/admin/addMatch", (req, res, next) => {
    Match.create(req.body)
      .then(match => res.send(match))
      .catch(err => res.status(500).send(err));
  });

  app.get("/api/admin/loadMatches", (req, res, next) => {
    // Match.findAll()
    //   .then(matches => {
    //     if (!matches.length)
    //       return res.status(404).send({ err: "Matches not found" });
    //     res.send(`find successfully: ${matches}`);
    //   })
    //   .catch(err => res.status(500).send(err));
    Match.find(function(err, matches) {
      if (err) return res.stauts(500).send({ error: "database failure" });
      res.json(matches);
    });
  });
};
