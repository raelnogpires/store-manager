const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('O método productsModel.getAll', () => {
  const productsMock = [
    { "id": 1, "name": "Martelo do Thor", "quantity": 10 },
    { "id": 2, "name": "Traje de Encolhimento", "quantity": 20 },
    { "id": 3, "name": "Escudo do Capitão América", "quantity": 30}
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

describe('O método productsModel.getById', () => {
  describe('quando o id existe', () => {
    const productMock = { id: 1, name: "Martelo do Thor", quantity: 10 };

    before(() => {
      sinon.stub(connection, 'execute').resolves([productMock]);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('retorna o produto', async () => {
      const result = await productsModel.getById(1);
  
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.equal(productMock);
    });
  });

  describe('quando o id não existe', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });
  
    it('retorna false', async () => {
      const result = await productsModel.getById(1);

      expect(result).to.be.false;
    });
  });
});

describe('O método productsModel.getByName', () => {
  describe('quando o nome é encontrado no DB', () => {
    const productMock = { id: 1, name: "Martelo do Thor", quantity: 10 };

    before(() => {
      sinon.stub(connection, 'execute').resolves([productMock]);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('retorna o produto correto', async () => {
      const result = await productsModel.getByName('Martelo do Thor');

      expect(result).to.be.an('object');
      expect(result).to.have.property('name', 'Martelo do Thor');
      expect(result).to.equal(productMock);
    });
  });

  describe('quando o nome não é encontrado no DB', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('retorna false', async () => {
      const result = await productsModel.getByName('Martelo do Homem Aranha');

      expect(result).to.be.false;
    });
  });
});

describe('O método productsModel.create', () => {
  describe('quando não há nome conflitante no DB', () => {
    const productMock = { id: 1, name: "Martelo do Thor", quantity: 10 };

    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: productMock.id }]);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('cria o produto corretamente', async () => {
      const result = await productsModel.create(productMock.name, productMock.quantity);

      expect(result).to.deep.equal({ id: productMock.id });
    });
  });
});
