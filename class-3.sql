-- https://github.com/lufelipe12/arnia-t4-m4/blob/exercises/exercises/semana_2.txt (08/11)



-- Se não tiver criada, recriar a tabela de usuarios da aula anterior com os mesmos campos (id -> PK; name -> VARCHAR(32), age -> INTEGER).
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(32), age INTEGER);




-- Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (email -> VARCHAR(64))
ALTER TABLE users ADD COLUMN email VARCHAR(64);




--Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (isAdmin -> BOOLEAN DEFAULT FALSE)	
ALTER TABLE users ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE;



--Alterar o nome da coluna "name" para "first_name"
ALTER TABLE users RENAME COLUMN name TO first_name;



-- Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (last_name -> VARCHAR(32) NOT NULL)
ALTER TABLE users ADD COLUMN last_name VARCHAR(32) NOT NULL;



--Fazer a criação de um ou mais usuários com idade maior que 20 anos.
INSERT INTO users(first_name, last_name, age, email)
VALUES
	('Vitor', 'Reis', 30, 'vitor.reis@arnia.com.br'),
  ('Teste', 'Reis', 20, 'teste.reis@arnia.com.br'),
  ('Menor', 'de idade', 17, 'menor.idade@arnia.com.br');
  
  
 
-- Deletar os usuarios com idade maior que 20 anos retornando tudo.
DELETE FROM users 
	WHERE age > 20
  RETURNING *;
  
  
  
  
-- Altere o "isAdmin" de um dos usuarios para true.
UPDATE users
	SET isAdmin = true
  WHERE id = 2;