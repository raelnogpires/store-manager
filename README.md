# Store Manager
Projeto de uma API REST de gerenciamento de vendas e produtos, sendo possível visualizar, criar, atualizar e deletar produtos e vendas.

## Tecnologias utilizadas
Esse projeto foi desenvolvido utilizando o framework [Express](https://expressjs.com/), o banco de dados [MySQL](https://www.mysql.com/) e as bibliotecas [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Sinon](https://sinonjs.org/) para criação dos testes unitários.  
A separação de camadas nessa aplicação seguem o padrão de arquitetura MSC (Model, Service, Controller).  
O banco de dados inicial, `StoreManager.sql` , foi fornecido pela **Trybe**.

## Executando a aplicação
Será necessário ter instalado as tecnologias [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) em sua máquina para executar a aplicação e testes.  

1. Clone o repositório:
```sh
 git clone git@github.com:raelnogpires/store-manager.git
```

2. Entre no repositório:
```sh
 cd store-manager
```

3. Copie o arquivo `.env.example` para `.env` :
```sh
 cp .env.example .env
```

4. Execute o docker-compose:
```sh
 docker-compose up
```

Para encerrar a aplicação, execute no terminal `Ctrl + C` .