const User = require("../models/User");
const Project = require("../models/Project");
const Book = require("../models/Book");

module.exports.index = async (req, res) => {
  res.send("respond with a resource");
};

module.exports.profile = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        branch: req.body.branch,
        year: req.body.year,
        contact: req.body.contact,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        //   console.log(result)
        res.send("success");
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

module.exports.profileGet = async (req, res) => {
  await User.findById(req.body._id)
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.project = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      stack: req.body.stack,
      status: req.body.status,
      user: req.body.user,
    });
    console.log(project);
    await project.save();
    res.send("success");
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
        console.log("aaa",result);
        res.send("success");
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
  await Project.find({ user: req.body._id })
    .populate("user", "name year branch")
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
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
  await Project.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
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
  await Project.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.book = async (req, res) => {
  try {
    const book = new Book({
      subject: req.body.subject,
      publication: req.body.publication,
      price: req.body.price,
      user: req.body.user,
    });
    console.log(book);
    await book.save();
    res.send("success");
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
        res.send("success");
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
  await Book.find({ user: req.body.user })
    .populate("user", "name year branch")
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
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
  await Book.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
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
  await Book.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};

module.exports.connectGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { skills: { $regex: req.query.search, $options: "i" } }
      : undefined;

  await User.find(find)
    .then(async (result) => {
      if (result) {
        console.log(result);
        res.send("success");
      } else {
        res.send("failed");
      }
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};