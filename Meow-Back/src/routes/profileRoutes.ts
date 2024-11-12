import { Router } from "express";
import {
  register,
  getUserById,
  updateProfile,
  getAddressByUserId,
  updateAddress,
  createAddress,
  deleteAddress,
  getHistoryByUserId,
  checkLogin,
  updateDefaultAddress
} from "../handlers/profileHandlers";
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET Method
router.get('/getUserById', authenticateToken, getUserById);
router.get('/getAddressByUserId', authenticateToken, getAddressByUserId);
router.get('/getHistoryByUserId', authenticateToken, getHistoryByUserId);

// POST Method
router.post('/register', authenticateToken, register);
router.post("/checkLogin", checkLogin)
router.post('/createAddress', authenticateToken, createAddress);

// PATCH Method
router.patch('/updateProfile', authenticateToken, updateProfile);
router.patch('/updateAddress', authenticateToken, updateAddress);
router.patch('/updateDefaultAddress', authenticateToken, updateDefaultAddress);

// DELETE Method
router.delete('/deleteAddress', authenticateToken, deleteAddress);

export default router