-- https://github.com/lufelipe12/arnia-t4-m4/blob/exercises/exercises/semana_3.txt (14-11)


-- a) Crie uma tabela "developers" ("id" -> UUID PK; "name" -> VARCHAR(100) NOT NULL; "skills" -> VARCHAR(200) NOT NULL; "is_active" -> BOOLEAN DEFAULT TRUE; "experience_years" -> INT NOT NULL; "created_at" -> DATE DEFAULT NOW);
CREATE TABLE developers(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  skills VARCHAR(200) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  experience_years INT NOT NULL,
  created_at DATE DEFAULT NOW()
);


-- b) Crie uma tabela "projects" ("id" -> UUID PK; "project_name" -> VARCHAR(100) NOT NULL; "start_date" -> DATE, "created_at" -> DATE DEFAULT NOW);
CREATE TABLE projects(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name VARCHAR(100) NOT NULL,
  start_date DATE,
  created_at DATE DEFAULT NOW()
);


-- c) Crie uma tabela pivô "developer_projects" para relacionar as duas primeiras tabelas N:N;
CREATE TABLE developer_projects (
  developer_id UUID,
  project_id UUID,
  FOREIGN KEY (developer_id) REFERENCES developers(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  PRIMARY KEY (developer_id, project_id)
);


-- d) Insira os dados presentes em query2.sql
INSERT INTO developers (name, skills, is_active, experience_years)
VALUES
    ('John Smith', 'Java, Python', TRUE, 5),
    ('Emily Johnson', 'C#, SQL', TRUE, 3),
    ('Michael Brown', 'JavaScript, HTML', FALSE, 2),
    ('Sophia Wilson', 'Python, Ruby', TRUE, 4),
    ('William Davis', 'C++, Java', TRUE, 6),
    ('Emma Jones', 'PHP, SQL', FALSE, 1),
    ('Liam Martinez', 'Java, JavaScript', TRUE, 7),
    ('Olivia Thompson', 'Python, CSS', TRUE, 4),
    ('Noah Anderson', 'C#, HTML', FALSE, 2),
    ('Ava Garcia', 'JavaScript, Ruby', TRUE, 5),
    ('Ethan Martinez', 'Java, SQL', TRUE, 6),
    ('Isabella Walker', 'Python, HTML', TRUE, 3),
    ('Mason Taylor', 'C++, JavaScript', FALSE, 1),
    ('Mia White', 'C#, PHP', TRUE, 4),
    ('James Hall', 'Python, Java', TRUE, 5),
    ('Charlotte Lee', 'JavaScript, CSS', FALSE, 2),
    ('Benjamin Turner', 'C++, Ruby', TRUE, 7),
    ('Amelia Adams', 'Java, SQL', TRUE, 6),
    ('Harper Hill', 'Python, HTML', TRUE, 0),
    ('Lucas Martinez', 'C#, JavaScript', FALSE, 11);


-- Tabela projects

INSERT INTO projects (project_name, start_date)
VALUES
    ('E-Commerce Website', '2023-01-15'),
    ('Mobile App Development', '2023-02-20'),
    ('Data Analytics Platform', '2023-03-10'),
    ('CRM System Enhancement', '2023-04-05'),
    ('Inventory Management App', '2023-05-12'),
    ('Financial Dashboard', '2023-06-18'),
    ('Healthcare App', '2023-07-25'),
    ('E-Learning Platform', '2023-08-10'),
    ('Social Media Integration', '2023-09-02'),
    ('AI Chatbot Development', '2023-10-15');

-- e) Popule a tabela de "developer_projects"
INSERT INTO developer_projects (developer_id, project_id) VALUES 
	('092d2697-1e84-4056-960b-05ba5f6db0c1','1bd24f15-83c4-43e8-9667-015d7ce93163' ),
  ('092d2697-1e84-4056-960b-05ba5f6db0c1', '6a8e9655-53b2-4b1b-93e5-22e7e888c445'),
  ('092d2697-1e84-4056-960b-05ba5f6db0c1', 'febb5eab-47f7-4aa1-86e7-dca95bfc411c'),
  ('6704c641-a7fa-4252-ac8e-bff47b1dfa58', '1bd24f15-83c4-43e8-9667-015d7ce93163');


-- f) Liste os programadores que estão atribuídos a projetos e mostre os nomes dos projetos aos quais estão atribuídos.
SELECT d.*, p.project_name FROM developers d
	INNER JOIN developer_projects dp ON dp.developer_id = d.id
  INNER JOIN projects p ON p.id = dp.project_id;


-- g) Liste o project_name e o start_date dos projetos que possuem pelo menos um programador com mais de 5 anos de experience_years.
SELECT p.project_name, p.start_date FROM projects p
	INNER JOIN developer_projects dp ON dp.project_id = p.id
  INNER JOIN developers d ON d.id = dp.developer_id
  WHERE d.experience_years > 5;
  
  
-- h) Conte quantos programadores estão envolvidos no projeto com nome 'Mobile App Development'.
SELECT COUNT(*) as quantity FROM developers d
	INNER JOIN developer_projects dp ON dp.developer_id = d.id
  INNER JOIN projects p ON p.id = dp.project_id
  WHERE p.project_name = 'Mobile App Development';



-- i) Liste os projetos que não têm programadores atribuídos.
SELECT p.* FROM projects p 
  LEFT JOIN developer_projects dp ON p.id = dp.project_id
  WHERE dp.project_id IS NULL;



-- j) Liste os projetos que têm programadores atribuídos.
SELECT DISTINCT p.* FROM projects p 
  INNER JOIN developer_projects dp ON p.id = dp.project_id;






