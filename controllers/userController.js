module.exports.connect = async (req, res) => {
    res.render('connect');
}

module.exports.projects = async (req, res) => {
    res.render('projects');
}

module.exports.myprojects = async (req, res) => {
    res.render('myprojects');
}

module.exports.createproject = async (req, res) => {
    res.render('createproject');
}

module.exports.books = async (req, res) => {
    res.render('books');
}

module.exports.mybooks = async (req, res) => {
    res.render('mybooks');
}

module.exports.createbook = async (req, res) => {
    res.render('createbook');
}