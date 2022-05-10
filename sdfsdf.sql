-- Получить названия товаров из заказа с id = 1
SELECT product_name, quantity
FROM `products`
JOIN `order_product` ON products.id_product = order_product.id_product
WHERE order_product.id_order =1

-- Получить характеристики товара с id = 2
SELECT option_name, description, value
FROM `product_option`
JOIN `options` ON options.id_option = product_option.id_option
WHERE product_option.id_product =2