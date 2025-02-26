var express = require('express');
var router = express.Router();
const connection = require('../database/connection');

router.get('/', function(req, res, next) {
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

router.post('/', function(req, res, next) {
   console.log('Form Data:', req.body);

   const { name, description, protein_category, cooking_time, instructions } = req.body;
   
   const ingredients = Array.isArray(req.body.ingredient) ? req.body.ingredient : [req.body.ingredient];
   const quantities = Array.isArray(req.body.quantity) ? req.body.quantity : [req.body.quantity];
   const units = Array.isArray(req.body.unit) ? req.body.unit : [req.body.unit];

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

           const ingredientValues = ingredients.map((ingredient, index) => [
               recipeId,
               ingredient,
               quantities[index],
               units[index]
           ]);

           const ingredientQuery = `
               INSERT INTO recipe_ingredients 
               (recipe_id, ingredient_id, quantity, unit) 
               VALUES ?`;

           connection.query(ingredientQuery, [ingredientValues], (err) => {
               if (err) {
                   console.error('Error adding ingredients:', err);
                   connection.query('DELETE FROM recipes WHERE id = ?', [recipeId]);
                   return res.status(500).render('error', { 
                       message: 'Error adding recipe ingredients' 
                   });
               }

               res.send(`
                    <script>
                        alert('Recipe added successfully!');
                        window.location.href = '/list';
                    </script>
                `);
           });
       });
});

module.exports = router;