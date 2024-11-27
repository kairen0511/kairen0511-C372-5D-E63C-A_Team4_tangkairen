CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shopName VARCHAR(255),       -- The name of the shop
    category VARCHAR(50),        -- General category (e.g., "Food", "Clothing", etc.)
    itemName VARCHAR(255),       -- Name of the item being purchased
    itemOptions JSON,            -- JSON object to store customizations/options
    addOns JSON,                 -- JSON object to store additional items
    price DECIMAL(10, 2),        -- Price of the item
    quantity INT DEFAULT 1,      -- Quantity of the item
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the item was added
);