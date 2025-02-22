var express = require('express');
var router = express.Router();
const connection = require('../database/connection');

/* GET list page. */
router.get('/', function(req, res, next) {
    // Query to get all recipes grouped by protein category
    const query = `
        SELECT * FROM recipes 
        ORDER BY protein_category`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).render('error', { 
                message: 'Error fetching recipes' 
            });
        }

        // Group recipes by protein category
        const recipesByCategory = {};
        results.forEach(recipe => {
            if (!recipesByCategory[recipe.protein_category]) {
                recipesByCategory[recipe.protein_category] = [];
            }
            recipesByCategory[recipe.protein_category].push(recipe);
        });

        // Render the page with our data
        res.render('list', { 
            title: 'Recipe Listing Page',
            recipesByCategory: recipesByCategory
        });
    });
});

module.exports = router;