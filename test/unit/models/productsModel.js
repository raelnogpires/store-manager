const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('O endpoint `/products`', () => {
  const productsMock = [
    { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
    {"id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
    {"id": 3, "name": "Escudo do Capitão América", "quantity": 30}
  ];

  before(() => {
    const execute = ([productsMock]);
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna todos os produtos cadastrados no DB', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result).to.equal(productsMock);
  });
});

describe('O endpoint `/products/:id`', () => {
  const productMock = { id: 1, name: "Martelo do Thor", quantity: 10 };

  before(() => {
    const execute = productMock;
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna o produto que tem o id informado', async () => {
    const result = await productsModel.getById(1);

    expect(result).to.have.property('id');
    expect(result).to.have.length(1);
    expect(result).to.equal(productMock);
  });
});
