var express = require('express');
var router = express.Router();
const connection = require('../database/connection');

router.get('/', function(req, res, next) {
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

        const recipesByCategory = {};
        results.forEach(recipe => {
            if (!recipesByCategory[recipe.protein_category]) {
                recipesByCategory[recipe.protein_category] = [];
            }
            recipesByCategory[recipe.protein_category].push(recipe);
        });

        res.render('list', { 
            title: 'Recipe Listing Page',
            recipesByCategory: recipesByCategory
        });
    });
});

module.exports = router;