


-- a) Remova a coluna "store_id" da tabela de produtos.
ALTER TABLE products DROP COLUMN store_id;


-- b) Crie uma nova tabela "product_store" para ser a tabela pivô da relação N:N product - store.
CREATE TABLE product_store(
	product_id BIGINT REFERENCES products(id),
  store_id BIGINT REFERENCES store(id),
  PRIMARY KEY (product_id, store_id)
);

-- c) Adicione valores a essa tabela.
INSERT INTO product_store(store_id, product_id) VALUES
	(1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 7),
  (2, 8),
  (2, 10),
  (2, 11),
  (3, 12),
  (3, 13);

-- d) Listar o nome e a cidade de todas as lojas que têm pelo menos um produto em estoque.
SELECT DISTINCT name, city FROM store
	JOIN product_store ps ON ps.store_id = store.id
  WHERE (
		SELECT in_stock FROM products
    	WHERE in_stock = true
    	AND products.id = ps.product_id
    	GROUP BY in_stock
	);
  

-- e) Listar o nome e a cidade de todas as lojas que possuem produtos com avaliação média maior ou igual a 4.
SELECT DISTINCT name, city FROM store
	JOIN product_store ps ON ps.store_id = store.id
  WHERE (
		SELECT AVG(rating) FROM evaluation
    	WHERE evaluation."productId" = ps.product_id
	) >= 4;
  
  
-- f) Listar o nome e cidade de todas lojas que possuem produtos com preço superior a 50.
SELECT DISTINCT name, city FROM store
	JOIN product_store ps ON ps.store_id = store.id
  WHERE (
		SELECT price FROM products
    	WHERE products.id = ps.product_id
	) > 200;
  
  
  
-- g) Obtenha o nome das lojas e o número total de avaliações registradas para cada loja.
SELECT DISTINCT name, COUNT(e.id) as evaluations FROM store
	LEFT JOIN product_store ps ON ps.store_id = store.id
  LEFT JOIN evaluation e ON e."productId" = ps.product_id
  GROUP BY store.name;






