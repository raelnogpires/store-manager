const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsService = require('../../../services/productService');

describe('O método productsService.getAll', () => {
  const productsMock = [
    { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
    {"id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
    {"id": 3, "name": "Escudo do Capitão América", "quantity": 30}
  ];

  before(() => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
  });

  after(() => {
    connection.execute.restore();
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
      sinon.stub(connection, 'execute').resolves(productMock)
    });

    after(() => {
      connection.execute.restore()
    });

    it('o produto com o mesmo id passado', async () => {    
      const result = await productsService.getById(1);

      expect(result).to.be.an('object');
      expect(result).to.equal(productMock);
    });
  });

  describe('retorna', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(false)
    });

    after(() => {
      connection.execute.restore()
    });

    it('false quando o id não é encontrado ou há erro', async () => {
      const result = await productsService.getById();

      expect(result).to.be.a('boolean');
      expect(result).to.equal(false);
    });
  });
});