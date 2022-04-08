const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const productsMock = [
  { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
  {"id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
  {"id": 3, "name": "Escudo do Capitão América", "quantity": 30}
];

const productMock = { "id": 1, "name": "Martelo do Thor", "quantity": 10 };

const notFoundErrorMock = { code: 404, message: 'Product not found' };

describe('O método productsController.getAll', () => {
  const request = {};
  const response = {};

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

describe('O método productsController.getById', () => {
  describe('retorna', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ product: productMock });
    });

    after(() => {
      productsService.getById.restore();
    });

    it('o status HTTP 200', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });

    it('o produto com o mesmo id passado', async () => {
      await productsController.getById(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    });
  });

  describe('quando não há resposta para o id', () => {
    const request = {};
    const response = {};
    const next = sinon.stub().returns();

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({ error: notFoundErrorMock });
    });

    after(() => {
      productsService.getById.restore();
    });

    it('chama o next com o objeto de erro', async () => {
      await productsController.getById(request, response, next);
      expect(next.calledWith(notFoundErrorMock)).to.be.true;
    });
  });
});

describe('O método productsController.create', () => {
  describe('quando o nome não existe', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { name: productMock.name, quantity: productMock.quantity };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'create').resolves({ id: productMock.id });
    });

    after(() => {
      productsService.create.restore();
    });

    it('retorna o status HTTP 201', async () => {
      await productsController.create(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });

    it('retorna o produto criado', async () => {
      await productsController.create(request, response);
      expect(response.json.calledWith(productMock)).to.be.true;
    });
  });

  describe('quando o nome já existe', () => {});
});
