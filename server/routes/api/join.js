const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  app.post("/api/account/join", (req, res, next) => {
    const { body } = req;
    const { email, password, nickname } = body;
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    if (!nickname) {
      return res.send({
        success: false,
        message: "Error: Nickname cannot be blank."
      });
    }

    //Steps:
    //1. Verify email doesn't exist
    //2. save
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exist."
          });
        }
        //save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.nickname = nickname;
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed up"
          });
        });
      }
    );
  });

  app.post("/api/account/login", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error1"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid1"
          });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid2"
          });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: server error2"
            });
          }

          return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    //get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    //verify the token is one of a kind and it
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    //get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    //verify the token is one of a kind and it
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });
};
