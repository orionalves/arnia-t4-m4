## Descrição

Bem vindos à aplicação Edusync. Esse projeto tem como objetivo o ensino de alunos da escola Arnia de programação.
Ele foi contruído pensando no gerenciamento de um sistema de ensino onde um usuário pode ser administrador, que gerencia matérias, instrutores e alunos, instrutor, que ministra as aulas, e também estudante que assiste as aulas ministradas. Temos a documentação do projeto que pode ser acessada em [DOC](http://localhost:3001/v1/docs).

## Tecnologias

- [Nestjs](https://nestjs.com/): Utilizado como framework backend, trabalhando por debaixo dos panos com Nodejs e Express.
- [Postgresql](https://www.postgresql.org/): Banco de dados relacional utilizado para armazenar informações do projeto.
- [TypeORM](https://typeorm.io/): ORM utilizado para comunicação com banco de dados.
- [Swagger](https://swagger.io/https://swagger.io/): Utilizado para documentação de rotas e seus métodos atrelados juntamente com os respectivos payloads.
- [Class-Validator](https://www.npmjs.com/package/class-validator?activeTab=readme): Usado para validações de payloads da aplicação.
- [Jest](https://jestjs.io/pt-BR/): Ferramenta de teste escolhida para realização e validação de serviços, rotas e módulos da aplicação.

## Instalando e rodando o projeto.

Primeiramente será necessária a instalação das bibliotecas presentes no projeto, para isso rode o comando:

```bash
npm install
```

Após a instalação, para rodar o projeto em modo de desenvolvimento:

```bash
npm run start:dev
```

Já para o modo de produção, rode em sequência:

```bash
npm run build

npm run start:prod
```

## Teste

Para rodar os testes:

```bash
npm run test
```

## Diagrama de entidades e relacionamento

![DER](https://private-user-images.githubusercontent.com/90461911/296382370-7c434036-4d4f-4c22-9e40-ab55301ac087.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDUwOTk0MjUsIm5iZiI6MTcwNTA5OTEyNSwicGF0aCI6Ii85MDQ2MTkxMS8yOTYzODIzNzAtN2M0MzQwMzYtNGQ0Zi00YzIyLTllNDAtYWI1NTMwMWFjMDg3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTEyVDIyMzg0NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThiYjk5YmZkZDdmMTk1M2VkODllZDNhMTBjOTcwOTc0MjJlZTFkOTFiNWRlYmQ3MGZlYWRlZDE4ZGFkOGY0ZmImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.lBLWN0wQjzpUVsM_3CoimPLpdk5_FUiXJsq_G0tHMHo)

## Suporte

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Contato

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

Nest is [MIT licensed](LICENSE).
