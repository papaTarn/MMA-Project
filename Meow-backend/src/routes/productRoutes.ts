import { Router } from "express";
import {
  getRecommend,
  getProductInfo,
  getProductListByCate,
  getCartByUserId,
  addCart,
  updateCart,
  deleteCart,
  getFavoriteListByUserId,
  setFavourite
} from "../handlers/productHandlers";
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET Method
router.get('/getProductInfo/:prodId', authenticateToken, getProductInfo)
router.get('/getCartByUserId', authenticateToken, getCartByUserId)
router.get('/getFavoriteListByUserId', authenticateToken, getFavoriteListByUserId);

// POST Method
router.post('/getRecommend', authenticateToken, getRecommend)
router.post('/getProductListByCate', authenticateToken, getProductListByCate)
router.post('/addCart', authenticateToken, addCart)
router.post('/setFavourite', authenticateToken, setFavourite);

// PATCH Method
router.patch('/updateCart', authenticateToken, updateCart)

// DELETE Method
router.delete('/deleteCart/:prodId', authenticateToken, deleteCart)

export default router