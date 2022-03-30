const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const productsMock = require('./productsMock.json');

describe('O endpoint `/products`', () => {
  before(() => {
    const execute = ([productsMock]);
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('lista todos os produtos cadastrados no DB', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
    expect(result).to.have.length(3);
    expect(result).to.equal(productsMock);
  });
});
