CREATE DATABASE recipe_site;
USE recipe_site;

CREATE TABLE ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    origin VARCHAR(100),
    safety_tips TEXT,
    interesting_fact TEXT
);

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    protein_category ENUM('Chicken', 'Beef', 'Tofu', 'Grains') NOT NULL,
    instructions TEXT,
    cooking_time VARCHAR(50)
);
CREATE TABLE recipe_ingredients (
    recipe_id INT,id,
    ingredient_id INT,
    quantity VARCHAR(50recipes),
    unit VARCHAR(30),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

INSERT INTO ingredients (name, origin, safety_tips, interesting_fact) VALUES
('Broccoli', 'Mediterranean', 'Wash thoroughly before cooking', 'Broccoli is a member of the cabbage family'),
('Soy Milk', 'China', 'Keep refrigerated, check expiration date', 'Soy milk has been produced for over 2000 years'),
('Quinoa', 'South America', 'Rinse before cooking to remove bitter coating', 'Quinoa is actually a seed, not a grain'),
('Bell Peppers', 'Americas', 'Store in refrigerator crisper drawer', 'Red bell peppers have more vitamin C than oranges'),
('Beef Sirloin', 'Global', 'Cook to desired doneness, let rest 5-10 minutes', 'Sirloin comes from the rear back of the cow'),
('Chicken Thighs', 'Global', 'Cook to 165°F internal temperature', 'Dark meat contains more iron than white meat'),
('Brown Rice', 'Asia', 'Store in airtight container', 'Brown rice has more fiber than white rice'),
('Firm Tofu', 'China', 'Press before cooking to remove excess water', 'Contains all nine essential amino acids'),
('Green Onions', 'Asia', 'Store upright in water for longer shelf life', 'All parts of green onions are edible');

INSERT INTO recipes (name, description, protein_category, instructions, cooking_time) VALUES
-- Chicken Recipes
('Lemon Garlic Chicken', 'Zesty and aromatic chicken dish', 'Chicken', '1. Season chicken\n2. Heat oil\n3. Cook chicken until golden\n4. Add lemon and garlic\n5. Simmer until done', '35 minutes'),
('Chicken Stir-Fry', 'Quick and healthy chicken with vegetables', 'Chicken', '1. Cut chicken into strips\n2. Prep vegetables\n3. Stir-fry chicken\n4. Add vegetables\n5. Add sauce', '25 minutes'),
('BBQ Chicken', 'Grilled chicken with BBQ sauce', 'Chicken', '1. Marinate chicken\n2. Preheat grill\n3. Grill chicken\n4. Baste with sauce\n5. Rest before serving', '40 minutes'),

-- Beef Recipes
('Beef Stir-Fry', 'Asian-style beef with vegetables', 'Beef', '1. Slice beef thinly\n2. Prepare sauce\n3. Stir-fry beef\n4. Add vegetables\n5. Combine with sauce', '25 minutes'),
('Beef Tacos', 'Classic Mexican-style tacos', 'Beef', '1. Brown beef\n2. Add seasonings\n3. Prepare toppings\n4. Warm tortillas\n5. Assemble tacos', '30 minutes'),
('Grilled Steak', 'Simple and delicious sirloin steak', 'Beef', '1. Season steak\n2. Preheat grill\n3. Grill to preference\n4. Rest meat\n5. Slice and serve', '20 minutes'),

-- Tofu Recipes
('Crispy Tofu', 'Crispy on outside, soft inside', 'Tofu', '1. Press tofu\n2. Cut into cubes\n3. Coat with cornstarch\n4. Fry until crispy\n5. Add sauce', '25 minutes'),
('Tofu Scramble', 'Vegetarian breakfast dish', 'Tofu', '1. Crumble tofu\n2. Sauté vegetables\n3. Add seasonings\n4. Cook until heated\n5. Serve hot', '15 minutes'),
('Tofu Curry', 'Creamy coconut curry with tofu', 'Tofu', '1. Cube tofu\n2. Make curry sauce\n3. Cook vegetables\n4. Add tofu\n5. Simmer', '35 minutes'),

-- Grain Recipes
('Quinoa Bowl', 'Healthy grain bowl with vegetables', 'Grains', '1. Cook quinoa\n2. Prepare vegetables\n3. Make dressing\n4. Combine ingredients\n5. Add toppings', '25 minutes'),
('Rice Pilaf', 'Flavorful rice with aromatics', 'Grains', '1. Sauté aromatics\n2. Add rice\n3. Add broth\n4. Simmer until done\n5. Fluff and serve', '30 minutes'),
('Brown Rice Stir-Fry', 'Healthy twist on fried rice', 'Grains', '1. Cook brown rice\n2. Prep vegetables\n3. Stir-fry vegetables\n4. Add rice\n5. Season to taste', '20 minutes');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
-- Lemon Garlic Chicken
(1, 6, '4', 'pieces'),     -- Chicken Thighs
(1, 9, '2', 'stalks'),     -- Green Onions

-- Chicken Stir-Fry  
(2, 6, '2', 'pounds'),     -- Chicken Thighs
(2, 8, '1', 'block'),      -- Firm Tofu
(2, 4, '2', 'pieces'),     -- Bell Peppers

-- BBQ Chicken
(3, 6, '3', 'pieces'),     -- Chicken Thighs

-- Beef Stir-Fry
(4, 5, '1', 'pound'),      -- Beef Sirloin
(4, 4, '2', 'pieces'),     -- Bell Peppers

-- Beef Tacos
(5, 5, '1', 'pound'),      -- Beef Sirloin
(5, 4, '1', 'piece'),      -- Bell Peppers

-- Grilled Steak
(6, 5, '2', 'pounds'),     -- Beef Sirloin

-- Crispy Tofu
(7, 8, '1', 'block'),      -- Firm Tofu
(7, 9, '2', 'stalks'),     -- Green Onions

-- Tofu Scramble
(8, 8, '1', 'block'),      -- Firm Tofu
(8, 4, '1', 'piece'),      -- Bell Peppers
(8, 9, '3', 'stalks'),     -- Green Onions

-- Tofu Curry
(9, 8, '2', 'blocks'),     -- Firm Tofu
(9, 9, '2', 'stalks'),     -- Green Onions

-- Quinoa Bowl
(10, 3, '2', 'cups'),      -- Quinoa
(10, 1, '1', 'piece'),     -- Broccoli
(10, 9, '2', 'stalks'),    -- Green Onions

-- Rice Pilaf
(11, 7, '2', 'cups'),      -- Brown Rice
(11, 9, '3', 'stalks'),    -- Green Onions

-- Brown Rice Stir-Fry
(12, 7, '3', 'cups'),      -- Brown Rice
(12, 4, '2', 'pieces'),    -- Bell Peppers
(12, 9, '2', 'stalks');    -- Green Onions