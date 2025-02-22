var express = require('express');
var router = express.Router();
const connection = require('../database/connection');

/* GET add recipe page with ingredients list */
router.get('/', function(req, res, next) {
   // Get all ingredients for the dropdown
   const query = "SELECT id, name FROM ingredients";
   
   connection.query(query, (err, ingredients) => {
       if (err) {
           console.error('Error fetching ingredients:', err);
           return res.status(500).render('error', { 
               message: 'Error fetching ingredients' 
           });
       }
       res.render('addrecipe', { 
           title: 'Add Recipe',
           ingredients: ingredients
       });
   });
});

/* POST new recipe */
router.post('/', function(req, res, next) {
   console.log('Form Data:', req.body);

   // Get form data
   const { name, description, protein_category, cooking_time, instructions } = req.body;
   
   // Convert form data into arrays if they're not already
   // This handles both single and multiple ingredients
   const ingredients = Array.isArray(req.body.ingredient) ? req.body.ingredient : [req.body.ingredient];
   const quantities = Array.isArray(req.body.quantity) ? req.body.quantity : [req.body.quantity];
   const units = Array.isArray(req.body.unit) ? req.body.unit : [req.body.unit];

   // Validate data
   if (!name || !description || !protein_category || !cooking_time || !instructions) {
       return res.status(400).render('error', { 
           message: 'All recipe fields are required' 
       });
   }

   if (!ingredients || !quantities || !units) {
       return res.status(400).render('error', { 
           message: 'Ingredient information is required' 
       });
   }

   // First insert the recipe
   const recipeQuery = `
       INSERT INTO recipes (name, description, protein_category, instructions, cooking_time) 
       VALUES (?, ?, ?, ?, ?)`;

   connection.query(recipeQuery, 
       [name, description, protein_category, instructions, cooking_time], 
       (err, result) => {
           if (err) {
               console.error('Error adding recipe:', err);
               return res.status(500).render('error', { 
                   message: 'Error adding recipe' 
               });
           }

           const recipeId = result.insertId;

           // Create array of ingredient relations
           const ingredientValues = ingredients.map((ingredient, index) => [
               recipeId,
               ingredient,
               quantities[index],
               units[index]
           ]);

           // Insert recipe-ingredient relationships
           const ingredientQuery = `
               INSERT INTO recipe_ingredients 
               (recipe_id, ingredient_id, quantity, unit) 
               VALUES ?`;

           connection.query(ingredientQuery, [ingredientValues], (err) => {
               if (err) {
                   console.error('Error adding ingredients:', err);
                   // If error adding ingredients, delete the recipe we just added
                   connection.query('DELETE FROM recipes WHERE id = ?', [recipeId]);
                   return res.status(500).render('error', { 
                       message: 'Error adding recipe ingredients' 
                   });
               }

               // Success! Redirect to the recipe list
               res.redirect('/list');
           });
       });
});

module.exports = router;