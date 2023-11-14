-- https://github.com/lufelipe12/arnia-t4-m4/blob/exercises/exercises/semana_2.txt (10/11) - EXTRA


-- i) Crie mais uma tabela para referenciar a tabela produtos "store" ("ID" -> SERIAL PK, "name" VARCHAR(64) NOT NULL, "city" -> VARCHAR(64))
CREATE TABLE store (id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, city VARCHAR(64));


-- j) Faça uma modificação na tabela de produtos para aceitar uma FK store_id.
ALTER TABLE products 
	ADD COLUMN store_id INT,
	ADD FOREIGN KEY(store_id)
  	REFERENCES products(id)
  	ON DELETE CASCADE;
      
      
  
  
-- k) Adicione valores a tabela "store"
INSERT INTO store(name, city) VALUES
	('Arnia Store', 'Belo Horizonte'),
  ('Reis Store', 'Vitória da Conquista');
  
  
 
-- l) Faça um update na tabela de produtos para adicionar os ids das lojas criadas.
UPDATE products
	SET store_id = 1
  WHERE products.id < 5;

  
UPDATE products
	SET store_id = 2
  WHERE products.id >= 5;
  
  
-- m) Selecione todas lojas que possuem produtos em estoque.
SELECT * FROM store
	WHERE (
		SELECT in_stock FROM products
    	WHERE in_stock = true
    	AND products.store_id = store.id
    	GROUP BY in_stock
	);
  