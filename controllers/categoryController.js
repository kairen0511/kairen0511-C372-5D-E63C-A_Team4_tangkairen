db = require('../db');
// Function to get all categories
exports.getCategories = (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving categories');
        }
        // Render HTML page with data
        res.render('admincategory', { category: results });
    });
};
// Render the Add Category form
exports.addCategoryForm = (req, res) => {
    res.render('adminaddCategory', { user: req.session.user }); // This renders the 'addCategory.ejs' view with a form
};

// Add a new category to the database
exports.addCategory = (req, res) => {
    const { category_name,category_description } = req.body;

    // Check if essential fields are provided
    if (!category_name || !category_description) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO category (category_name, category_description) VALUES (?, ?)';
    db.query(sql, [category_name,category_description], (error, results) => {
        if (error) {
            console.error('Error adding category:', error);
            return res.status(500).send('Error adding category');
        }
        res.redirect('/');  // Redirect to the category list page after successful addition
    });
};


// Render the Edit Category form
exports.updateCategoryForm = (req, res) => {
    const category_id = req.params.category_id;
    const sql = 'SELECT * FROM category WHERE category_id = ?';

    // Fetch data from MySQL based on the category ID
    db.query(sql, [category_id], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message); 
            return res.status(500).send('Error retrieving category by ID');
        }

        // Check if any student with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the category data
            res.render('adminupdateCategory', { category: results[0] });
        } else {
            // If no student with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('Category not found');
        }
    });
};
// Handle the category update operation
exports.updateCategory = (req, res) => {
    const category_id = req.params.category_id; // Retrieve the category ID from the request parameters
    const { category_name, category_description } = req.body; // Destructure category name and description from the request body

    // Validate that the essential fields are filled
    if (!category_name || !category_description) {
        return res.status(400).send('All fields are required'); // If any required fields are missing, send a 400 status with a message
    }

    const sql = 'UPDATE category SET category_name = ?, category_description = ? WHERE category_id = ?';

    // Update the category in the database
    db.query(sql, [category_name, category_description, category_id], (error, results) => {
        if (error) {
            console.error('Error updating category:', error); // Log any errors that occur during the query
            return res.status(500).send('Error updating category'); // Send a 500 status if there's an error updating the category
        }
        // Redirect to the category list after successful update
        res.redirect('/'); // After updating, redirect to the main category list page
    });
};


// Handle the student deletion operation
exports.deleteCategory = (req, res) => {
    const  categoryid = req.params.category_id;
    const sql = 'DELETE FROM category WHERE category_id = ?';

    db.query(sql, [categoryid], (error, results) => {
        if (error) {
            console.error('Error deleting category:', error);
            return res.status(500).send('Error deleting category');
        }
        // Redirect to the category list after successful deletion
        res.redirect('/');
    });
};