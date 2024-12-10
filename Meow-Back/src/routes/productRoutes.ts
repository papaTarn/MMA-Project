import { Router } from "express";
import {
  getRecommend,
  getProductInfo,
  getProductListByCate,
  getCartByUserId,
  getCountCartByUserId,
  addCart,
  updateCart,
  deleteCart,
  getFavoriteListByUserId,
  setFavourite,
  purchaseOrder,
  getProductAll,
  orderHistoryAll,
  orderHistoryById
} from "../handlers/productHandlers";
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET Method
router.get('/getProductInfo/:prodId', authenticateToken, getProductInfo)
router.get('/getCartByUserId', authenticateToken, getCartByUserId)
router.get('/getCountCartByUserId', authenticateToken, getCountCartByUserId)
router.get('/getFavoriteListByUserId', authenticateToken, getFavoriteListByUserId);

// POST Method
router.post('/getRecommend', authenticateToken, getRecommend)
router.post('/getProductListByCate', authenticateToken, getProductListByCate)
router.post('/addCart', authenticateToken, addCart)
router.post('/setFavourite', authenticateToken, setFavourite);
router.post('/purchaseOrder', authenticateToken, purchaseOrder);
router.post('/getProductAll', authenticateToken, getProductAll);
router.post('/orderHistoryAll', authenticateToken, orderHistoryAll);
router.post('/orderHistoryById', authenticateToken, orderHistoryById);

// PATCH Method
router.patch('/updateCart', authenticateToken, updateCart)

// DELETE Method
router.delete('/deleteCart/:prodId', authenticateToken, deleteCart)

export default router