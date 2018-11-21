// routes/index.js

module.exports = function(app, User) {
  //   app.get("/join/emailCheck", (req, res) => {
  //     User.findOne((err, users) => {
  //       if (err) return res.status(500).send({ error: "database faiure" });
  //       res.json(users);
  //     });
  //   });

  app.get("/join/insert", (req, res) => {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.nickname = req.body.password;

    user.save(err => {
      if (err) {
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });

  //   // GET SINGLE BOOK
  //   app.get("/api/books/:book_id", function(req, res) {
  //     Book.findOne({ _id: req.params.book_id }, function(err, book) {
  //       if (err) return res.status(500).json({ error: err });
  //       if (!book) return res.status(404).json({ error: "book not found" });
  //       res.json(book);
  //     });
  //   });

  //   // GET BOOK BY AUTHOR
  //   app.get("/api/books/author/:author", function(req, res) {
  //     Book.find(
  //       { author: req.params.author },
  //       { _id: 0, title: 1, published_date: 1 },
  //       function(err, books) {
  //         if (err) return res.status(500).json({ error: err });
  //         if (books.length === 0)
  //           return res.status(404).json({ error: "book not found" });
  //         res.json(books);
  //       }
  //     );
  //   });

  //   app.put("/api/books/:book_id", function(req, res) {
  //     Book.findById(req.params.book_id, function(err, book) {
  //       if (err) return res.status(500).json({ error: "database failure" });
  //       if (!book) return res.status(404).json({ error: "book not found" });

  //       if (req.body.title) book.title = req.body.title;
  //       if (req.body.author) book.author = req.body.author;
  //       if (req.body.published_date)
  //         book.published_date = req.body.published_date;

  //       book.save(function(err) {
  //         if (err) res.status(500).json({ error: "failed to update" });
  //         res.json({ message: "book updated" });
  //       });
  //     });
  //   });

  //   // UPDATE THE BOOK (ALTERNATIVE)
  //   app.put("/api/books/:book_id", function(req, res) {
  //     Book.update({ _id: req.params.book_id }, { $set: req.body }, function(
  //       err,
  //       output
  //     ) {
  //       if (err) res.status(500).json({ error: "database failure" });
  //       console.log(output);
  //       if (!output.n) return res.status(404).json({ error: "book not found" });
  //       res.json({ message: "book updated" });
  //     });
  //   });
  //   // DELETE BOOK
  //   app.delete("/api/books/:book_id", function(req, res) {
  //     Book.remove({ _id: req.params.book_id }, function(err, output) {
  //       if (err) return res.status(500).json({ error: "database failure" });

  //       /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
  //         if(!output.result.n) return res.status(404).json({ error: "book not found" });
  //         res.json({ message: "book deleted" });
  //         */

  //       res.status(204).end();
  //     });
  //   });
};
