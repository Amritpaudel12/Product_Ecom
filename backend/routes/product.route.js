
import express,{ Router } from 'express'   
import { createProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct } from '../controllers/products.controller.js';

const router = Router();

router.route('/create-product').post(createProduct);
router.route('/product/:id').get(getSpecificProduct);
router.route('/products').get(getAllProducts);
router.route('/product/update/:id').put(updateProduct);
router.route('/product/delete/:id').delete(deleteProduct);

export default router;