# RecipeHub

A dynamic recipe website built with Express.js, EJS templating, and MySQL. This project allows users to browse recipes by protein categories, view detailed recipes with interactive ingreident information, and add new recipes.

## Features
- Home page with cooking experience and quick introduction
- Recipe listing page categorized by protein type
- Detailed recipe view with ingredient hover information
- Form to add new recipes with client-side validation

## Prerequisites
Before you begin, install the following:
1. [Node.js](https://nodejs.org/en/download)
2. [MySQL](https://dev.mysql.com/downloads/installer/)
3. [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## Getting Started

Clone the repo and open up the project in your IDE.
```
git clone https://github.com/aashishdhanani/recipe-site.git
```

Install Dependencies

```
npm install
```

Open MySQL Workbench and connect to your local MySQL server (after installing MySQL, you will be able to start the server during installation and get credentials for later use). 

Paste the contents of the RecipeTemplate.sql file in the root directory into a tab in the workbench and run the file. This will create the database schema, create the tables, and insert base values in order for you to view them on the site.

Configure environment variables

Create a ```.env``` file in the root directory with the following content:

```
DATABASE_HOST=localhost
DATABASE_USER=your_mysql_username
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=recipe_site
```

Running the application

```
npm start
```

Open your browser and navigate to:

```
http://127.0.0.1:3000/
```

## Using the Website:
Browsing Recipes:
- Navigate to "List of Recipes" to view recipes categorized by protein type

Viewing Recipe Details:
- Navigate to the "Recipe" page and select a recipe from the dropdown menu
- Click "View Recipe" to see details

Adding Recipes
- Navigate to "Add Recipe"
- Fill out the form
- Submit the form. This will add the recipe to your database and you will be able to view it on the other pages



