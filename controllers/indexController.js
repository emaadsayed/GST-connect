const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.index = async (req, res) => {
    res.render('index', { title: 'Express' });
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
        console.log(user);
        await user.save();
        res.send("success");
      } catch {
        res.send("failed");
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
                  // res.status(200);
                  res.redirect("/users/connect");
                // res.send("success");
                } else {
                //   res.status(401);
                //   req.flash("homepageMessage", "Incorrect Password");
                //   res.redirect("/");
                res.send("failed");
                }
              }
            );
          })
          .catch((e) => {
            // res.status(404);
            // req.flash("homepageMessage", "User does not exist");
            // res.redirect("/");
            res.send("failed");
          }); 
    } 
 