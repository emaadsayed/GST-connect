const User = require("../models/User");
const Project = require("../models/Project");
const Book = require("../models/Book");
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


module.exports.profile = async (req, res) => {
  let profile = await User.findById(req.session.userObj._id);
  console.log("profile",profile)
  console.log(req.body)
  profile.name = req.body.name;
  profile.branch = req.body.branch;
  profile.year = req.body.year;
  profile.contact = req.body.contact;
  profile.instagram = req.body.instagram;
  profile.linkedin = req.body.linkedin;
  profile.facebook = req.body.facebook;
  profile.bio = req.body.bio;
  profile.type = req.body.type;
  profile.skills = req.body.skills;
 saveCover(profile, req.body.cover)
    try {
      let user = await profile.save();
      req.session.userObj = user;
      req.session.image = user.coverImagePath;
      res.redirect("/users/myprofile");
    } catch (e) {
      console.log(e)
      res.redirect("/users/myprofile");
    }
};

module.exports.profileGet = async (req, res) => {
  await User.findById(req.session.userObj._id)
    .then(async (result) => {
      if (result) {
        res.render('myprofile',{result: result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/users/connect")
      }
    })
    .catch((e) => {
      res.redirect("/users/connect")
    });
};

module.exports.createproject = async (req, res) => {
  res.render('createproject',{image:req.session.image, name:req.session.userObj.name});
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
    res.redirect("/users/createproject");
  }
};

module.exports.projectGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { stack: { $regex: req.query.search, $options: "i" } }
      : undefined;

  await Project.find(find)
    .populate("user", "name year branch coverImage coverImageType")
    .then( result => {
      if (result) {
        res.render('projects', {result: result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/users/connect");
      }
    }) 
    .catch((e) => {
      res.redirect("/users/connect");
    }); 
};   

module.exports.myProject = async (req, res) => {
  await Project.find({ user: req.session.userObj._id })
    .populate("user", "name year branch coverImage coverImageType")
    .then(async (result) => {
      if (result) {
        res.render('myprojects', {result: result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/users/projects");
      }
    })
    .catch((e) => {
      res.redirect("/users/projects");
    });
};

module.exports.projectDelete = async (req, res) => {
  await Project.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        res.redirect("/users/myprojects");
      } else {
        res.redirect("/users/myprojects");
      }
    })
    .catch((e) => {
      res.redirect("/users/myprojects");
    });
};

module.exports.projectEditGet = async (req, res) => {
  await Project.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        res.render('editproject',{ result: result[0], image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/users/myprojects");
      }
    })
    .catch((e) => {
      res.redirect("/users/myprojects");
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
        res.redirect("/users/myprojects");
      } else {
        res.redirect("/users/myprojects");
      }
    })
    .catch((e) => {
      res.redirect("/users/myprojects");
    });
};

module.exports.book = async (req, res) => {
  console.log("body", req.body)
  try {
    const book = new Book({
      subject: req.body.subject,
      publication: req.body.publication,
      price: req.body.price,
      user: req.session.userObj._id,
    });
    saveCover(book, req.body.cover)
    console.log(book);
    await book.save();
    res.redirect("/users/mybooks");
  } catch {
    res.redirect("/users/createbook");
  }
};

module.exports.bookGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { subject: { $regex: req.query.search, $options: "i" } }
      : undefined;

  await Book.find(find)
    .populate("user", "name year branch coverImage coverImageType")
    .then(async (result) => {
      if (result) {
        res.render('books',{result:result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.send("/users/connect");
      }
    })
    .catch((e) => {
      res.send("/users/connect");
    });
};

module.exports.myBook = async (req, res) => {
  await Book.find({ user: req.session.userObj._id })
    .populate("user", "name year branch coverImage coverImageType")
    .then(async (result) => {
      if (result) {
        res.render('mybooks',{result : result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.send("/users/books");
      }
    })
    .catch((e) => {
      res.send("/users/books");
    });
};

module.exports.bookDelete = async (req, res) => {
  console.log(req.params.id)
  await Book.findOneAndDelete({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        res.redirect("/users/mybooks");
      } else {
        res.send("/users/books");
      }
    })
    .catch((e) => {
      res.send("/users/books");
    });
};

module.exports.bookEditGet = async (req, res) => {
  await Book.find({ _id: req.params.id })
    .then(async (result) => {
      if (result) {
        res.render('editbook',{ result: result[0], image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/users/mybooks");
      }
    })
    .catch((e) => {
      res.redirect("/users/mybooks");
    });
};

module.exports.bookEdit = async (req, res) => {
 let book = await Book.findById(req.params.id);;
 book.subject = req.body.subject;
 book.publication = req.body.publication;
 book.price = req.body.price;
 book.user = req.session.userObj._id;
 saveCover(book, req.body.cover)
    try {
      await book.save();
      res.redirect("/users/mybooks");
    } catch (e) {
      res.redirect("/users/createbook");
    }
  };

module.exports.connectGet = async (req, res) => {
    let search = req.query.search;
    let find = search
      ? { skills: { $regex: req.query.search, $options: "i" } }
      : {type: "Public"};

  await User.find(find)
    .then(async (result) => {
      if (result) {
        res.render('connect',{result:result, image:req.session.image, name:req.session.userObj.name});
      } else {
        res.redirect("/");
      }
    })
    .catch((e) => {
      res.redirect("/");
    });
};


module.exports.createbook = async (req, res) => {
    res.render('createbook', {image:req.session.image, name:req.session.userObj.name});
}

function saveCover(event, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    event.coverImage = new Buffer.from(cover.data, 'base64')
    event.coverImageType = cover.type
  }
}
