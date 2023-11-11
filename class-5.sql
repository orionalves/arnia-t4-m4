-- https://github.com/lufelipe12/arnia-t4-m4/blob/exercises/exercises/semana_2.txt#L72 (10/11)


-- a) Crie uma nova tabela "evaluation" ("ID" -> SERIAL PK, "description" TEXT, "rating" -> INT de 0 a 5 NOT NULL, "product_id" -> FK product.id com deleção em cascata)
CREATE TABLE "evaluation"(
  "id" BIGSERIAL PRIMARY KEY,
  "description" VARCHAR(250), 
  "rating" INTEGER NOT NULL, 
  "productId" BIGINT NOT NULL,
  CHECK ("rating">=0 AND "rating"<=5),
  FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
  );


-- b) Faça a inserção de dados nessa tabela criada referenciando os produtos avaliados (obrigatoriamente um deles sem descrição.)
INSERT INTO "evaluation"(description, rating, "productId") VALUES
	('Bom e bonito', 4, 8),
  ('Perfeito!!!', 5, 6),
  ('Corre d+. Mt bom', 5, 13),
  ('Mt ruim. Parece o vasco', 2, 9),
   ('Legal', 3, 5),
  (null, 4, 20);


-- c) Selecione os dados da tabela de produtos juntamente com as de avaliações.
SELECT * FROM products p
	LEFT JOIN evaluation e ON e."productId" = p.id;


-- d) Selecione os produtos que tiveram avaliação igual ou acima de "rating" 4.
 SELECT p.name, e.rating FROM products p
		LEFT JOIN evaluation e ON e."productId" = p.id
  		WHERE e."rating" >= 4;


-- e) Selecione os produtos que a avaliação = NULL.
SELECT p.name, e.rating FROM products p
		RIGHT JOIN evaluation e ON e."productId" = p.id
  		WHERE e."description" IS NULL;



-- f) Faça a contagem do total de linhas na tabela de avaliações.
SELECT COUNT(id) FROM evaluation;



-- g) Delete um dos produtos da tabela produtos.
DELETE FROM products
	WHERE products.id = 9;


-- h) Faça a contagem do total de linhas na tabela de avaliações.
SELECT COUNT(id) FROM evaluation;
