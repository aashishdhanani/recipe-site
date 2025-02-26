var express = require('express');
var router = express.Router();
const connection = require('../database/connection');

/* GET recipe page with dropdown */
router.get('/', function(req, res, next) {
    // Get all recipes for dropdown
    const query = "SELECT id, name FROM recipes";
    
    connection.query(query, (err, recipes) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).render('error', { 
                message: 'Error fetching recipes' 
            });
        }
        res.render('recipe', { 
            title: 'Recipe Page',
            recipes: recipes,
            selectedRecipe: null
        });
    });
});

/* GET specific recipe when selected */
router.get('/:id', function(req, res, next) {
    const recipeId = req.params.id;
    
    // First query to get all recipes for dropdown
    const recipesQuery = "SELECT id, name FROM recipes";
    
    // Second query to get specific recipe details
    const recipeQuery = `
        SELECT r.*, 
            i.id as ingredient_id,
            i.name as ingredient_name, 
            i.origin as ingredient_origin,
            i.safety_tips as ingredient_safety_tips,
            i.interesting_fact as ingredient_interesting_fact,
            ri.quantity, 
            ri.unit
        FROM recipes r
        LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
        LEFT JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE r.id = ?`;

    // Run both queries
    connection.query(recipesQuery, (err, recipes) => {
        if (err) {
            return res.status(500).render('error', { message: 'Error fetching recipes' });
        }

        connection.query(recipeQuery, [recipeId], (err, results) => {
            if (err) {
                return res.status(500).render('error', { message: 'Error fetching recipe details' });
            }

            if (results.length === 0) {
                return res.status(404).render('error', { message: 'Recipe not found' });
            }

            const selectedRecipe = {
                id: results[0].id,
                name: results[0].name,
                description: results[0].description,
                cooking_time: results[0].cooking_time,
                instructions: results[0].instructions,
                ingredients: results.map(row => ({
                    name: row.ingredient_name,
                    quantity: row.quantity,
                    unit: row.unit,
                    origin: row.ingredient_origin,
                    safety_tips: row.ingredient_safety_tips,
                    interesting_fact: row.ingredient_interesting_fact
                }))
            };

            res.render('recipe', { 
                title: 'Recipe Page',
                recipes: recipes,
                selectedRecipe: selectedRecipe
            });
        });
    });
});

module.exports = router;