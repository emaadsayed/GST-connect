const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
    res.render('index');
}

module.exports.signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          branch: req.body.branch,
          year: req.body.year,
          password: hashedPassword,
        });
        let data = await user.save();
        req.session.userObj = data;
        res.redirect("/users/connect");
      } catch {
        res.redirect("/");
      }
    }

    module.exports.login = (req, res) => {
        let email = req.body.email.trim();
        User.find({ email: email })
          .then((user) => {
            bcrypt.compare(
              req.body.password,
              user[0].password,
              function (err, result) {
                if (result) {
                  req.session.userObj = user[0];
                  req.session.image = user[0].coverImagePath
                  res.redirect("/users/connect");
                } else {
                  res.redirect("/");
                }
              }
            );
          })
          .catch((e) => {
            res.redirect("/");
          }); 
    } 

    module.exports.logout = async (req, res) => {
      req.session.destroy();
      res.redirect("/");
    }

 
