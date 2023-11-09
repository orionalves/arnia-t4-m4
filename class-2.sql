

-- Crair tabelas de usuarios
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(32), age INTEGER);



-- inserir usuario
INSERT INTO users(name, age)
	VALUES ('Teste 2', 20);


-- inserir multiplos usuarios
INSERT INTO users(name, age)
	VALUES 
		('Teste 3', 15),
		('Teste 4', 30);


-- selecionar os usuarios
SELECT * FROM users;


-- deletar tabela
DROP TABLE users;