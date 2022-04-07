const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('O método salesService.getAll', () => {
  const salesMock = [
    { saleId: 1, date: "2022-03-30 16:39:09", productId: 1, quantity: 5 },
    { saleId: 1, date: "2022-03-30 16:39:09", productId: 2, quantity: 10 },
    { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 },
  ];

  before(() => {
    sinon.stub(salesModel, 'getAll').resolves(salesMock);
  });

  after(() => {
    salesModel.getAll.restore();
  });

  it('retorna todas as vendas cadastradas no DB', async () => {
    const result = await salesService.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result).to.equal(salesMock);
  });
});

describe('O método salesService.getById', () => {
  describe('retorna', () => {
    const saleMock = { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 };

    before(() => {
      sinon.stub(salesModel, 'getById').resolves(saleMock);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('a venda com o mesmo id passado', async () => {
      const { sale } = await salesService.getById(saleMock.id);

      expect(sale).to.have.property('saleId')
      expect(sale).to.be.an('object');
      expect(sale).to.equal(saleMock);
    });
  });

  describe('retorna', () => {
    before(() => {
      sinon.stub(salesModel, 'getById').resolves(false);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('um código e uma mensagem de erro quando o id não é encontrado', async () => {
      const { error } = await salesService.getById(1);

      expect(error).to.have.property('code', 404);
      expect(error).to.have.property('message', 'Sale not found');
    });
  });
});

describe('O método salesService.create', () => {
  const salesMock = [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 3 },
  ];

  const createdSaleMock = { id: 3, itemsSold: salesMock.map(({ productId, quantity }) => (
    { productId, quantity }
  ))};

  before(() => {
    sinon.stub(salesModel, 'create').resolves(createdSaleMock);
  });

  after(() => {
    salesModel.create.restore();
  });

  it('retorna a venda criada', async () => {
    const result = await salesService.create(createdSaleMock.itemsSold);

    expect(result).to.equal(createdSaleMock);
  });
});