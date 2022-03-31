const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('O método salesModel.getAll', () => {
  const salesMock = [
    { saleId: 1, date: "2022-03-30 16:39:09", productId: 1, quantity: 5 },
    { saleId: 1, date: "2022-03-30 16:39:09", productId: 2, quantity: 10 },
    { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 },
  ];

  before(() => {
    const execute = [salesMock];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna todas as vendas cadastradas no DB', async () => {
    const result = await salesModel.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result).to.equal(salesMock);
  });
});

describe('O método salesModel.getById`', () => {
  const saleMock = { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 };

  before(() => {
    sinon.stub(connection, 'execute').resolves([saleMock]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna a venda que tem o id informado', async () => {
    const result = await salesModel.getById(2);

    expect(result).to.have.property('saleId')
    expect(result).to.be.an('object');
    expect(result).to.equal(saleMock);
  });
});