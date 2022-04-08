const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const salesMock = [
  { saleId: 1, date: "2022-03-30 16:39:09", productId: 1, quantity: 5 },
  { saleId: 1, date: "2022-03-30 16:39:09", productId: 2, quantity: 10 },
  { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 },
];

const saleMock = { saleId: 2, date: "2022-03-30 16:39:09", productId: 3, quantity: 15 };

const notFoundErrorMock = { code: 404, message: 'Sale not found' };

describe('O método salesController.getAll', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(salesMock);
  });

  after(() => {
    salesService.getAll.restore();
  });

  it('retorna status HTTP 200', async () => {
    await salesController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('retorna os produtos cadastrados no DB', async () => {
    await salesController.getAll(request, response);
    expect(response.json.calledWith(salesMock)).to.be.true;
  });
});

describe('O método salesController.getById', () => {
  const saleByIdMock = { date: "2022-03-30 16:39:09", productId: 3, quantity: 15 };

  describe('retorna', () => {
    const request = {};
    const response = {};
  
    before(() => {
      request.params = { id: 2 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves(saleByIdMock);
    });
  
    after(() => {
      salesService.getById.restore();
    });

    it('o status HTTP 200', async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('a venda com o id informado', async () => {
      await salesController.getById(request, response);
      expect(response.json.calledWith(saleByIdMock)).to.be.true;
    });
  });

  describe('quando não há resposta para o id', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();
  
    before(() => {
      request.params = { id: 2 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves({ error: notFoundErrorMock });
    });
  
    after(() => {
      salesService.getById.restore();
    });

    it('chama o next com o objeto de erro', async () => {
      await salesController.getById(request, response, next);
      expect(next.calledWith(notFoundErrorMock)).to.be.true;
    });
  });
});