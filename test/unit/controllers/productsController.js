const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('O método productsController.getAll', () => {
  const request = {};
  const response = {};

  const productsMock = [
    { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
    {"id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
    {"id": 3, "name": "Escudo do Capitão América", "quantity": 30}
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(productsMock);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('retorna status HTTP 200', async () => {
    await productsController.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.true;
  });

  it('retorna os produtos cadastrados no DB', async () => {
    await productsController.getAll(request, response);
    expect(response.json.calledWith(productsMock)).to.be.true;
  });
});
