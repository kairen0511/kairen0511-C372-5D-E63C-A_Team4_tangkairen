db = require('../db');

// Render index page
exports.renderHome = (req, res) => {
    res.render('index', { users: req.session.user, messages: req.flash('success') });
};

// Handle registration
exports.register = (req, res) => {
    const { username, email, password, address, contact, role } = req.body;

    const sql = 'INSERT INTO users (username, email, password, address, contact, role) VALUES (?, ?, SHA1(?), ?, ?, ?)';
    db.query(sql, [username, email, password, address, contact, role], (err, result) => {
        if (err) {
            throw err;
        }
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    });
};

// Render register form
exports.renderRegisterForm = (req, res) => {
    res.render('register', { messages: req.flash('error'), formData: req.flash('formData')[0] });
};

// Render login form
exports.renderLoginForm = (req, res) => {
    res.render('login', {
        messages: req.flash('success'),
        errors: req.flash('error')
    });
};

// Handle login form submission
exports.login = (req, res) => {    
    const { email ,password } = req.body;

    if (!email || !password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/login');
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = SHA1(?)';
    db.query(sql, [email, password], (err, results) => {
        if (err) { 
            throw err;
        }
        if (results.length > 0) {
            req.session.user = results[0];
            req.flash('success', 'Login successful');
            res.redirect('/admincategory');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
    });
};


exports.adminCategory = (req, res) => {
    db.query('SELECT * FROM category', (error, results) => {
        if (error) throw error;
        res.render('admincategory', { category: results, users: req.session.user });
    });
};

// User category route
exports.userCategory = (req, res) => {
    db.query('SELECT * FROM category', (error, results) => {
        if (error) throw error;
        res.render('usercategory', { users: req.session.user, category: results });
    });
};

// Logout User
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};