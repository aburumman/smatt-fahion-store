import express from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { orderValidation, validateResult } from '../middleware/validate.js';

const router = express.Router();

router.post('/', protect, orderValidation, validateResult, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

export default router;
