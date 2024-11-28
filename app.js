const express = require('express');
const multer = require('multer');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
//require controllers
const categoryController = require('./controllers/categoryController');
const userController = require('./controllers/userController');


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });


// Set up view engine
app.set('view engine', 'ejs');
//  enable static files
app.use(express.static('public'));
// enable form processing
app.use(express.urlencoded({
    extended: false
}));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use(flash());

// Middleware function to validate registration
const validateRegistration = (req, res, next) => {
    const { username, email, password, address, contact } = req.body;

    if (!username || !email || !password || !address || !contact) {
        req.flash('error', 'All fields are required');
        req.flash('formData', req.body);
        return res.redirect('/register');
    }

    if (password.length < 6) {
        req.flash('error', 'Password should be at least 6 characters long');
        req.flash('formData', req.body);
        return res.redirect('/register');
    }

    if (!email.includes('@')) {
        req.flash('error', 'Invalid email');
        req.flash('formData', req.body);
        return res.redirect('/register');
    }

    next();
};

// Middleware function to check if user is authenticated
const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'Please login to view this resource');
        res.redirect('/login');
    }
};

// Middleware function to check if user is an admin
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        req.flash('error', 'Access denied');
        res.redirect('/usercategory');
    }
};
// Render index page (home)
app.get('/', userController.renderHome);

// Admin category route
app.get('/admincategory', checkAuthenticated, checkAdmin, userController.adminCategory);

// User category route
app.get('/usercategory', checkAuthenticated, userController.userCategory);

// Register route
app.post('/register', userController.register);

// Render register form
app.get('/register', userController.renderRegisterForm);

// Render login form
app.get('/login', userController.renderLoginForm);

// Login route for form submission
app.post('/login', userController.login);

// Category Routes
// Display list of categories
app.get('/', categoryController.getCategories);

// Render Add Category Form
app.get('/addCategory',  categoryController.addCategoryForm);
app.post('/addCategory',  categoryController.addCategory);

// Render Edit Category Form
app.get('/updateCategory/:category_id', categoryController.updateCategoryForm);

// Handle Edit Category Form Submission
app.post('/updateCategory/:category_id', categoryController.updateCategory);

// Handle Delete Category
app.post('/deleteCategory/:category_id', categoryController.deleteCategory);

// Logout route
app.get('/logout', userController.logout);

//Start express server and bind it to a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//kairen added a comment2
