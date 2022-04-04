const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/productsController');
const saleValidation = require('../middlewares/productValidation');

const router = express.Router();

router
  .get('/sales', rescue(salesController.getAll))
  .get('/sales/:id', rescue(salesController.getById))
  .post('/sales', saleValidation, rescue(salesController.create))
  .put('/sales/:id', saleValidation, rescue(salesController.update))
  .delete('/sales/:id', rescue(salesController.deleteById));

module.exports = router;