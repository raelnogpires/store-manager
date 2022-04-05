const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/productsController');
// const saleValidation = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', rescue(salesController.getAll));
// router.get('/:id', rescue(salesController.getById));
// router.post('/', saleValidation, rescue(salesController.create));
// router.put('/:id', saleValidation, rescue(salesController.update));
// router.delete('/:id', rescue(salesController.deleteById));

module.exports = router;