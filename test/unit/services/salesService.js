const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesService = require('../../../services/salesService');

describe('O método salesService.getAll', () => {
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
    const result = await salesService.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(2);
    expect(result).to.equal(salesMock);
  });
});

describe('O método salesService.getById', () => {
  describe('retorna', () => {
    const saleMock = { id: 1, date: "2022-03-30 16:39:09" };

    before(() => {
      sinon.stub(connection, 'execute').resolves(saleMock);
    });

    after(() => {
      connection.execute.restore();
    });

    it('a venda com o mesmo id passado', async () => {
      const result = await salesService.getById(1);

      expect(result).to.be.an('object');
      expect(result).to.equal(saleMock);
    });
  });

  describe('retorna', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    });

    it('false quando o id não é encontrado ou há erro', async () => {
      const result = await salesService.getById('');

      expect(result).to.be.a('boolean');
      expect(result).to.equal(false);
    });
  });
});