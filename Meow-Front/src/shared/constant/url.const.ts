// Config URL เชื่ือมต่อหลังบ้านทั้งหมด

export const URL = {
  // Master
  USER: '/users',
  GetSpeedauto: '/api/config/getSpeedauto',
  GetProdBanner: '/api/product/getProdBanner',

  // Profile
  getByUserId: '/api/profile/getByUserId',
  createUser: '/api/profile/createUser',
  updateProfile: '/api/profile/updateProfile',
  getUserByEmail: '/api/profile/getUserByEmail',
  getAddressByUserId: '/api/profile/getAddressByUserId',
  updateAddress: '/api/profile/updateAddress',
  createAddress: '/api/profile/createAddress',
  deleteAddress: '/api/profile/deleteAddress',
  getHistoryByUserId: '/api/profile/getHistoryByUserId',

  // Banner
  bannerGetAll: '/api/banner/bannerGetAll',
  bannerAutoSpeed: '/api/banner/bannerAutoSpeed',

  // Master
  getAllMessage: '/api/master/getAllMessage',
  getAllCategory: '/api/master/getAllCategory',
  getAllConfig: '/api/master/getAllConfig',

  // Product/Cart/Favorite
  getRecommend: '/api/product/getRecommend',
  getProductInfo: '/api/product/getProductInfo',
  getProductListByCate: '/api/product/getProductListByCate',
  getCartByUserId: '/api/product/getCartByUserId',
  createOrder: '/api/product/createOrder',
  updateCart: '/api/product/updateCart',
  deleteCart: '/api/product/deleteCart',
  getFavouriteListByUserId: '/api/product/getFavouriteListByUserId',
  setFavourite: '/api/product/setFavourite',
};
