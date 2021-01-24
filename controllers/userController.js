const User = require("../models/User");
const Project = require("../models/Project");
const Book = require("../models/Book");

// module.exports.index = async (req, res) => {
//   res.send("respond with a resource");
// };

// module.exports.profile = async (req, res) => {
//   await User.findOneAndUpdate(
//     { _id: req.body._id },
//     {
//       $set: {
//         name: req.body.name,
//         email: req.body.email,
//         branch: req.body.branch,
//         year: req.body.year,
//         contact: req.body.contact,
//         instagram: req.body.instagram,
//         linkedin: req.body.linkedin,
//         facebook: req.body.facebook,
//         bio: req.body.bio,
//       },
//     },
//     { new: true }
//   )
//     .then((result) => {
//       if (result) {
//         //   console.log(result)
//         res.send("success");
//         // req.flash("flashMessages", "Profile Updated Successfully.");
//         // res.redirect("/user/team");
//       } else {
//         // req.flash(
//         //   "flashMessages",
//         //   "Profile Updating Failed, Please try again."
//         // );
//         // res.redirect("/user/team");
//         res.send("failed");
//       }
//     })
//     .catch((e) => {
//       //   console.log(e);
//       //   req.flash("flashMessages", "Profile Updating Failed, Please try again.");
//       //   res.redirect("/user/team");
//       res.send("failed");
//     });
// };

// module.exports.profileGet = async (req, res) => {
//   await User.findById(req.body._id)
//     .then(async (result) => {
//       if (result) {
//         console.log(result);
//         res.send("success");
//       } else {
//         res.send("failed");
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send("failed");
//     });
// };

module.exports.createproject = async (req, res) => {
  res.render('createproject');
}

module.exports.project = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      stack: req.body.stack,
      status: req.body.status,
      user: req.session.userObj._id,
    });
    console.log(project);
    await project.save();
    res.redirect("/users/myprojects");
  } catch {
    res.send("failed");
  }
};

module.exports.projectGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { stack: { $regex: req.query.search, $options: "i" } }
      : undefined;

  await Project.find(find)
    .populate("user", "name year branch")
    .then( result => {
      if (result) {
        // console.log("aaa",result);
        // res.send("success");
        console.log(result);
        res.render('projects', {result: result});
      } else {
        res.send("failed");
      }
    }) 
    .catch((e) => {
      console.log(e);
      res.send("failed f"); 
    }); 
};   

module.exports.myProject = async (req, res) => {
  await Project.find({ user: req.session.userObj._id })
    .populate("user", "name year branch")
    .then(async (result) => {
      if (result) {
        console.log(result);
        // res.send("success");
        res.render('myprojects', {result: result});
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.projectDelete = async (req, res) => {
  console.log(req.params.id)
  await Project.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      console.log(result)
      if (result) {
        console.log(result);
        res.redirect("/users/myprojects");
      } else {
        res.send("failed ff");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.projectEditGet = async (req, res) => {
  await Project.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.render('editproject',{ result: result[0]});
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.projectEdit = async (req, res) => {
  await Project.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
      title: req.body.title,
      description: req.body.description,
      stack: req.body.stack,
      status: req.body.status,
      user: req.session.userObj._id,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        //   console.log(result)
        res.redirect("/users/myprojects");
        // req.flash("flashMessages", "Profile Updated Successfully.");
        // res.redirect("/user/team");
      } else {
        // req.flash(
        //   "flashMessages",
        //   "Profile Updating Failed, Please try again."
        // );
        // res.redirect("/user/team");
        res.send("failed");
      }
    })
    .catch((e) => {
      //   console.log(e);
      //   req.flash("flashMessages", "Profile Updating Failed, Please try again.");
      //   res.redirect("/user/team");
      res.send("failed");
    });
};

module.exports.book = async (req, res) => {
  try {
    const book = new Book({
      subject: req.body.subject,
      publication: req.body.publication,
      price: req.body.price,
      user: req.session.userObj._id,
    });
    console.log(book);
    await book.save();
    res.redirect("/users/mybooks");
  } catch {
    res.send("failed");
  }
};

module.exports.bookGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { subject: { $regex: req.query.search, $options: "i" } }
      : undefined;

  await Book.find(find)
    .populate("user", "name year branch")
    .then(async (result) => {
      if (result) {
        console.log(result);
        // res.send("success");
        res.render('books',{result:result});
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.myBook = async (req, res) => {
  await Book.find({ user: req.session.userObj._id })
    .populate("user", "name year branch")
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.render('mybooks',{result : result});
        // res.send("success");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.bookDelete = async (req, res) => {
  console.log(req.params.id)
  await Book.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log("delete",result);
        // res.send("success");
        res.redirect("/users/mybooks");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.bookEditGet = async (req, res) => {
  await Book.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        // res.send("success");
        res.render('editbook',{ result: result[0]});
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.bookEdit = async (req, res) => {
  await Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        subject: req.body.subject,
        publication: req.body.publication,
        price: req.body.price,
        user: req.session.userObj._id,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        //   console.log(result)
        res.redirect("/users/mybooks");
        // req.flash("flashMessages", "Profile Updated Successfully.");
        // res.redirect("/user/team");
      } else {
        // req.flash(
        //   "flashMessages",
        //   "Profile Updating Failed, Please try again."
        // );
        // res.redirect("/user/team");
        res.send("failed");
      }
    })
    .catch((e) => {
      //   console.log(e);
      //   req.flash("flashMessages", "Profile Updating Failed, Please try again.");
      //   res.redirect("/user/team");
      res.send("failed");
    });
};

// module.exports.connectGet = async (req, res) => {
//     let search = req.query.search;
//     let find = search
//       ? { skills: { $regex: req.query.search, $options: "i" } }
//       : undefined;

//   await User.find(find)
//     .then(async (result) => {
//       if (result) {
//         console.log(result);
//         res.send("success");
//       } else {
//         res.send("failed");
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send("failed");
//     });
// };


module.exports.connect = async (req, res) => {
  console.log("aaa",req.session.userObj)
    res.render('connect');
}

module.exports.createbook = async (req, res) => {
    res.render('createbook');
}
