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

## Executando os testes
Em um terminal execute:
```sh
 docker-compose up run npm test
```

## Documentação

### Listar produtos
Busca todos os produtos cadastrados.  
O corpo da resposta contém um array JSON contendo os produtos e suas informações.  

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 GET http://localhost:3000/products
```

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                      |
|:-----------|:---------|:-----------------------------------|
| id         | int      | ID do produto.                     |
| name       | string   | Nome do produto.                   |
| quantity   | int      | Quantidade em estoque do produto.  |

#### Códigos de status da resposta
| **Código** | **Descrição**                      |
|:-----------|:-----------------------------------|
| 200        | Produtos retornados com sucesso.   |

#### Exemplo
Resposta:
```json
 [
  {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
    "quantity": 20
  },  
  {
    "id": 3,
    "name": "Escudo do CapitÃ£o AmÃ©rica",
    "quantity": 30
  }
 ]
```

</details>

### Listar produto por ID
Busca um produto especificado pelo seu ID.  
Corpo da resposta contém um objeto JSON com o produto e suas informações.  

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 GET http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path
| **Campo**  | **Tipo** | **Descrição**           |
|:-----------|:---------|:------------------------|
| id         | int      | ID do produto.          |

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                     |
|:-----------|:---------|:----------------------------------|
| id         | int      | ID do produto.                    |
| name       | string   | Nome do produto.                  |
| quantity   | int      | Quantidade em estoque do produto. |

#### Códigos de status da resposta
| **Código** | **Descrição**                      |
|:-----------|:-----------------------------------|
| 200        | Produto retornado com sucesso.     |
| 404        | Produto não encontrado.            |

#### Exemplo
Resposta:
```json
 {
   "id": 1,
   "name": "Martelo de Thor",
   "quantity": 10
 }
```

</details>

### Cadastrar produto
Cadastra um novo produto.  
Corpo da resposta contém um objeto JSON com as informações do produto cadastrado.

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 POST http://localhost:3000/products
```

#### Parâmetros

##### Body
| **Parâmetro**  | **Tipo** | **Descrição**                                       |
|:---------------|:---------|:----------------------------------------------------|
| name           | string   | Nome do produto. **Obrigatório**, mínimo: 5 letras. |
| quantity       | int      | Quantidade do produto. **Obrigatório**, mínimo: 1.  |

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                      |
|:-----------|:---------|:-----------------------------------|
| id         | int      | ID do produto.                     |
| name       | string   | Nome do produto.                   |
| quantity   | int      | Quantidade em estoque do produto.  |

#### Códigos de status da resposta
| **Código** | **Descrição**                                     |
|:-----------|:--------------------------------------------------|
| 201        | Produto cadastrado com sucesso.                   |
| 400        | Parâmetro não encontrado no `body` da requisição. |
| 422        | Parâmetro inválido.                               |

#### Exemplo

Requisição:
```json
 "name": "Armadura do Homem de Ferro",
 "quantity": 1,
```

Resposta:
```json
 "id": 4,
 "name": "Armadura do Homem de Ferro",
 "quantity": 1,
```

</details>

### Atualizar um produto
Edita um produto especificado pelo seu ID.  
Corpo da resposta contém um objeto JSON com as informações do produto atualizado.

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 PUT http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path
| **Campo**  | **Tipo** | **Descrição**           |
|:-----------|:---------|:------------------------|
| id         | int      | ID do produto.          |

##### Body
| **Parâmetro**  | **Tipo** | **Descrição**                                       |
|:---------------|:---------|:----------------------------------------------------|
| name           | string   | Nome do produto. **Obrigatório**, mínimo: 5 letras. |
| quantity       | int      | Quantidade do produto. **Obrigatório**, mínimo: 1.  |

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                      |
|:-----------|:---------|:-----------------------------------|
| id         | int      | ID do produto.                     |
| name       | string   | Nome do produto.                   |
| quantity   | int      | Quantidade em estoque do produto.  |

#### Códigos de status da resposta
| **Código** | **Descrição**                                     |
|:-----------|:--------------------------------------------------|
| 200        | Produto atualizado com sucesso.                   |
| 400        | Parâmetro não encontrado no `body` da requisição. |
| 404        | Produto não encontrado.                           |
| 422        | Parâmetro inválido.                               |

#### Exemplo

Requisição:  
`http://localhost:3000/products/1`  

```json
 "name": "Anel de Sauron",
 "quantity": 2,
```

Resposta:
```json
 "id": 1,
 "name": "Anel de Sauron",
 "quantity": 2,
```

</details>

### Deletar um produto
Deleta um produto especificado pelo seu ID.

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 DELETE http://localhost:3000/products/{id}
```

#### Parâmetros

##### Path
| **Campo**  | **Tipo** | **Descrição**           |
|:-----------|:---------|:------------------------|
| id         | int      | ID do produto.          |

#### Códigos de status da resposta
| **Código** | **Descrição**                                     |
|:-----------|:--------------------------------------------------|
| 204        | Produto deletado com sucesso.                     |
| 404        | Produto não encontrado.                           |

Este endpoint retorna, em caso de sucesso, apenas o status `204` .

</details>

### Listar vendas
Busca todas as vendas cadastradas.  
Corpo da resposta contém um array JSON com as vendas e suas informações.

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 GET http://localhost:3000/sales
```

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                      |
|:-----------|:---------|:-----------------------------------|
| saleId     | int      | ID da venda.                       |
| productId  | int      | ID do produto vendido.             |
| date       | string   | Data da venda.                     |
| quantity   | int      | Quantidade vendida do produto.     |

#### Códigos de status da resposta
| **Código** | **Descrição**                      |
|:-----------|:-----------------------------------|
| 200        | Vendas retornadas com sucesso.     |

#### Exemplo

Resposta:
```json
 [
   {
    "saleId": 1,
    "date": "2022-06-13T19:19:01.000Z",
    "productId": 1,
    "quantity": 5
   },
   {
    "saleId": 1,
    "date": "2022-06-13T19:19:01.000Z",
    "productId": 2,
    "quantity": 10
   },
   {
    "saleId": 2,
    "date": "2022-06-13T19:19:01.000Z",
    "productId": 3,
    "quantity": 15
   }
 ]
```

</details>

### Listar venda por ID
Busca uma venda especificada pelo seu ID.  
Corpo da resposta contém um objeto JSON contendo a venda e suas informações.

<details>
  <summary><strong>Detalhes</strong></summary>

#### URL
```sh
 GET http://localhost:3000/sales/{id}
```

#### Parâmetros

##### Path
| **Campo**  | **Tipo** | **Descrição**           |
|:-----------|:---------|:------------------------|
| id         | int      | ID da venda.            |

#### Campos da resposta
| **Campo**  | **Tipo** | **Descrição**                      |
|:-----------|:---------|:-----------------------------------|
| date       | string   | Data da venda.                     |
| productId  | int      | ID do produto vendido.             |
| quantity   | int      | Quantidade vendida do produto.     |

#### Códigos de status da resposta
| **Código** | **Descrição**                      |
|:-----------|:-----------------------------------|
| 200        | Venda retornada com sucesso.       |
| 404        | Venda não encontrada.              |

#### Exemplo

Resposta:
```json
 {
  "date": "2022-06-13T19:19:01.000Z",
  "productId": 3,
  "quantity": 15
 }
```

</details>
