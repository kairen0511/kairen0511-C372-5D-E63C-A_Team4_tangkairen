-- Create the treasurebox table
CREATE TABLE treasurebox (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shop_name VARCHAR(255) NOT NULL,
    shop_image VARCHAR(255),
    description TEXT,
    address VARCHAR(255),
    status VARCHAR(20), -- 'Open Now' or 'Close Now'
    price DECIMAL(10, 2), -- Price of the food item
    taste VARCHAR(50), -- Taste profile (e.g., Umami, Salty, Spicy)
    time_of_day VARCHAR(50), -- Time of day for the food (e.g., Breakfast, Lunch, Dinner)
    price_range VARCHAR(20), -- Price range (e.g., 0-10, 10-30)
    cuisine VARCHAR(100) -- Cuisine type (e.g., Chinese, Japanese)
);

-- 1. Wang Bu Liao Traditional Prawn Noodles
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES 
('Wang Bu Liao Traditional Prawn Noodles', 'wang_bu_liao.jpg',
 'Bold flavors and authentic taste! A classic bowl that takes prawn noodles to the next level. Worth every bite! Really matches the name of "Wang Bu Liao" which means unforgettable.',
 '6001 Beach Rd, #01-27 Golden Mile Tower, Singapore 199589', 'Open Now', 5.00, 'Umami', 'Breakfast', '0-10', 'Chinese');

-- 2. Tian Tian Hainanese Chicken Rice
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES
('Tian Tian Hainanese Chicken Rice', 'tian_tian.jpg',
 'Tender chicken, fragrant rice, and unforgettable flavor! Simple, perfect, and absolutely a must-try!',
 '1 Kadayanallur St, #01-10/11 Maxwell Food Centre, Singapore 069184', 'Open Now', 5.00, 'Salty', 'Lunch', '0-10', 'Singaporean');

-- 3. Lime Restaurant
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES
('Lime Restaurant', 'lime_restaurant.jpg',
 'A feast with multiple good dishes! One of the better buffets I\'ve eaten before. Elegant dishes in a cozy setting—ideal for any occasion. Can\'t wait to return!',
 '3 Upper Pickering St, Singapore 058289', 'Open Now', 80.00, 'Umami', 'Dinner', '60-100', 'Western');

-- 4. Enishi Ramen SG
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES
('Enishi Ramen SG', 'enishi_ramen_image.jpg',
 'A minimalistic ramen shop known for its light and flavorful broths, handmade noodles, and cozy ambiance.',
 '10 Anson Road, International Plaza, Singapore', 'Open Now', 19.80, 'Umami', 'Lunch', '10-30', 'Japanese');

-- 5. Brother Ramen
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES
('Brother Ramen', 'brother_ramen_image.jpg',
 'Specializes in a lighter, flavorful ramen with tender braised pork and the option to add extra noodles.',
 '10 Anson Road, International Plaza, Singapore', 'Open Now', 15.00, 'Umami', 'Lunch', '10-30', 'Japanese');

-- 6. Sin Heng Kee
INSERT INTO treasurebox (shop_name, shop_image, description, address, status, price, taste, time_of_day, price_range, cuisine)
VALUES
('Sin Heng Kee', 'sin_heng_kee_image.jpg',
 'Renowned for its traditional Singapore-style Cantonese noodles with robust broths and fresh ingredients.',
 'Hougang branch 685 Hougang Street 61 #01-150', 'Close Now', 8.00, 'Salty', 'Dinner', '10-30', 'Cantonese');

