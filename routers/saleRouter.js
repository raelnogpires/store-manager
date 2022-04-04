const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/productsController');
const { saleValidation } = require('../middlewares/productValidation');

const router = express.Router();

router
  .get('/sales', salesController.getAll)
  .get('/sales/:id', salesController.getById)
  .post('/sales', saleValidation, rescue(salesController.create))
  .put('/sales/:id', saleValidation, rescue(salesController.update));

module.exports = router;