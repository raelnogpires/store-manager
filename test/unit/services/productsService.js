const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('O método productsService.getAll', () => {
  const productsMock = [
    { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
    {"id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
    {"id": 3, "name": "Escudo do Capitão América", "quantity": 30}
  ];

  before(() => {
    sinon.stub(productsModel, 'getAll').resolves(productsMock);
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('retorna os produtos cadastrados no DB', async () => {
    const result = await productsService.getAll();
    expect(result).to.be.equal(productsMock);
  });
});

describe('O método productsService.getById', () => {

  describe('retorna', () => {
    const productMock = { "id": 1, "name": "Martelo do Thor", "quantity": 10 };

    before(() => {
      sinon.stub(productsModel, 'getById').resolves(productMock);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('o produto com o mesmo id passado', async () => {
      const { product } = await productsService.getById(productMock.id);

      expect(product).to.deep.equal(productMock);
    });
  });

  describe('retorna', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(false);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('um código e uma mensagem de erro quando o id não é encontrado', async () => {
      const { error } = await productsService.getById(1);

      expect(error).to.have.property('code', 404);
      expect(error).to.have.property('message', 'Product not found');
    });
  });
});
