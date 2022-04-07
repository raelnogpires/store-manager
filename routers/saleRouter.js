const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const saleValidation = require('../middlewares/saleValidation');

const router = express.Router();

router.get('/', rescue(salesController.getAll));
router.get('/:id', rescue(salesController.getById));
router.post('/', saleValidation, rescue(salesController.create));
router.put('/:id', saleValidation, rescue(salesController.update));
router.delete('/:id', rescue(salesController.deleteById));

module.exports = router;