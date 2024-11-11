// Config URL เชื่ือมต่อหลังบ้านทั้งหมด

export const URL = {
  // Profile
  register: '/api/profile/register',
  checkLogin: '/api/profile/checkLogin',
  getUserById: '/api/profile/getUserById',
  updateProfile: '/api/profile/updateProfile',
  createAddress: '/api/profile/createAddress',
  getAddressByUserId: '/api/profile/getAddressByUserId',
  updateAddress: '/api/profile/updateAddress',
  updateDefaultAddress: '/api/profile/updateDefaultAddress',
  deleteAddress: '/api/profile/deleteAddress',
  getHistoryByUserId: '/api/profile/getHistoryByUserId',


  // Banner
  getAutoPlaySpeed: '/api/master/getAutoPlaySpeed',
  getAllBanner: '/api/master/getAllBanner',


  // Master All  
  getAllMessage: '/api/master/getAllMessage',
  getAllCategory: '/api/master/getAllCategory',
  getAllConfig: '/api/master/getAllConfig',


  // Product/Cart/Favorite
  getRecommend: '/api/product/getRecommend',
  getProductInfo: '/api/product/getProductInfo',
  getProductListByCate: '/api/product/getProductListByCate',
  getCartByUserId: '/api/product/getCartByUserId',
  getFavoriteListByUserId: '/api/product/getFavoriteListByUserId',
  setFavourite: '/api/product/setFavourite',
  addCart: '/api/product/addCart',
  product: '/api/product/updateCart',
  deleteCart: '/api/product/deleteCart',
};
