const Match = require("../../models/Match");

module.exports = app => {
  app.post("/addMatch", (req, res, next) => {
    Match.create(req.body)
      .then(match => res.send(match))
      .catch(err => res.status(500).send(err));
  });

  app.post("/getMatchList", (req, res, next) => {
    const { numberOfMatches, option } = req.body;
    let match;
    if (option === "all") {
      match = Match.find({});
    } else if (option === "betting") {
      match = Match.find({ bettingEnd: false });
    } else if (option === "bettingEnd") {
      match = Match.find({ bettingEnd: true });
    } else if (option === "matchEnd") {
      match = Match.find({ matchEnd: true });
    }

    match
      .find(function(err, matchList) {
        if (err) return res.stauts(500).send({ error: "database failure" });
        res.json(matchList);
      })
      .limit(numberOfMatches)
      .sort({ _id: -1 });
  });

  app.post("/deleteMatch", (req, res, next) => {
    const { id } = req.body;
    Match.deleteOne({ _id: id }, err => {
      if (err) return res.json({ sucess: false, error: err });
      return res.json({ sucess: true });
    });
  });

  app.post("/updateMatch", (req, res, next) => {
    const { id, update } = req.body;
    Match.updateOne({ _id: id }, update, err => {
      if (err) return res.json({ sucess: false, error: err });
      return res.json({ sucess: true });
    });
  });

  app.post("/insertMatch",(req,res,next)=>{
    const {id, insert} =req.body;
    Match.updateOne({_id:id}, err=>{
      if(err) return res.json({sucess:false, error:err});
      return res.json({sucess:true})
    })
  })
};
