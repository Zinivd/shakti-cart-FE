const BASE_URL = "https://api-prod.shakticart.com"; 


export const Urls = {
  // Authentication Endpoints
  register: `${BASE_URL}/api/register`,
  login: `${BASE_URL}/api/login`,
  logout: `${BASE_URL}/api/logout`,
  userInfo: `${BASE_URL}/api/user/info`,
  updateUser: `${BASE_URL}/api/user/update`,
  deleteUser: `${BASE_URL}/api/user/delete`,

  // Address Endpoints
  addAddress: `${BASE_URL}/api/address/add`,
  getAddressList: `${BASE_URL}/api/address/list`,
  getAddressByUser: `${BASE_URL}/api/address/by-user`,
  updateAddress: `${BASE_URL}/api/address/update`,
  deleteAddress: `${BASE_URL}/api/address/delete`,

  // Customer Endpoints
  getCustomerById: `${BASE_URL}/api/customers-list-byId`,
  getAllCustomers: `${BASE_URL}/api/customers-list`,

  // Category Endpoints
  createCategory: `${BASE_URL}/api/category/create`,
  getAllCategories: `${BASE_URL}/api/category/all`,
  updateCategory: `${BASE_URL}/api/category/update`,
  deleteCategory: `${BASE_URL}/api/category/delete`,

  // Subcategory Endpoints
  createSubcategory: `${BASE_URL}/api/subcategory/create`,
  getAllSubcategories: `${BASE_URL}/api/subcategories`,
  getSubcategoriesByCategory: `${BASE_URL}/api/subcategories/by-category`,
  updateSubcategories: `${BASE_URL}/api/subcategories/update`,
  deleteSubcategory: `${BASE_URL}/api/subcategories/delete`,

  // Product Endpoints
  createProduct: `${BASE_URL}/api/product/create`,
  updateProduct: `${BASE_URL}/api/product/update`,
  deleteProduct: `${BASE_URL}/api/product/delete`,
  getAllProducts: `${BASE_URL}/api/product/all`,
  getProductById: `${BASE_URL}/api/product/by-id`,
  getProductsByCategory: `${BASE_URL}/api/products/by-category`,
  getProductsBySubcategory: `${BASE_URL}/api/products/by-subcategory`,
  getProductsByFilter: `${BASE_URL}/api/products/filter`,

  // Cart Endpoints
  addToCart: `${BASE_URL}/api/cart/add`,
  removeFromCart: `${BASE_URL}/api/cart/remove`,
  getCartProducts: `${BASE_URL}/api/cart/list`,

  // Wishlist Endpoints
  addToWishlist: `${BASE_URL}/api/wishlist/add`,
  removeFromWishlist: `${BASE_URL}/api/wishlist/remove`,
  getWishlistProducts: `${BASE_URL}/api/wishlist/list`,

  // Order Endpoints
  placeOrder: `${BASE_URL}/api/order/place`,
  getOrders: `${BASE_URL}/api/order/list`,
  getOrdersByUserId: `${BASE_URL}/api/orders`,
  getOrderByOrderId: `${BASE_URL}/api/orders_byorderId`,
  updateOrderStatus: `${BASE_URL}/api/order/update-status`,
};

// Helper function to build URL with query parameters
export const buildUrlWithParams = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// Export base URL for reference
export { BASE_URL };