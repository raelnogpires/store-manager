const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('O endpoint `/sales`', () => {
  const salesMock = [
    { id: 1, date: "2022-03-30 16:39:09" },
    { id: 2, date: "2022-03-30 16:39:09" }
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
    expect(result).to.have.length(2);
    expect(result).to.equal(salesMock);
  });
});

describe('O endpoint `/sales/:id`', () => {
  const saleMock = { id: 1, date: "2022-03-30 16:39:09" };

  before(() => {
    sinon.stub(connection, 'execute').resolves(saleMock);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna a venda que tem o id informado', async () => {
    const result = await salesModel.getById(1);

    expect(result).to.be.an('object');
    expect(result).to.equal(saleMock);
  });
});