-- Insertar categorías
INSERT INTO categories (name, description) VALUES
('Camisetas', 'Camisetas personalizadas de alta calidad'),
('Tazas', 'Tazas cerámicas con diseños únicos'),
('Gorras', 'Gorras bordadas personalizadas'),
('Sudaderas', 'Hoodies y sudaderas personalizadas'),
('Accesorios', 'Fundas, mouse pads y más');

-- Insertar productos
INSERT INTO products (name, description, price, image_url, category_id, stock, is_customizable) VALUES
('Camisa', 'Camisa 100% algodón personalizable', 29.99, '/images/camisa.png', 1, 50, TRUE),
('Taza Cerámica', 'Taza cerámica con diseño personalizado', 15.99, '/images/taza.png', 2, 100, TRUE),
('Gorra Embroider', 'Gorra con bordado personalizado', 24.99, '/images/gorra.png', 3, 75, TRUE),
('Sudadera Hoodie', 'Sudadera cómoda y personalizable', 49.99, '/images/sueter.png', 4, 30, TRUE),
('Funda iPhone', 'Funda de teléfono con impresión', 19.99, '/images/funda (1).png', 5, 60, TRUE),
('Botella Térmica', 'Botella térmica personalizada', 34.99, '/images/termo.jpg', 5, 40, TRUE),
('Cuaderno', 'Cuaderno con diseño único', 12.99, '/images/cuaderno.jpg', 5, 80, TRUE),
('Mouse Pad', 'Mouse pad personalizado', 18.99, '/images/mouse.jpg', 5, 50, TRUE);
