import { Client } from "./client";
import { Urls, buildUrlWithParams } from "./urls";

// Simple GET request
export async function getCartProducts(body = {}) {
  try {
    const result = await Client(Urls.getCartProducts, body, "get");
    return result;
  } catch (error) {
    console.error(`error in function getCartProducts: `, error);
    return null;
  }
}

// GET request with query parameters — now hits shakti-products index w/ category_id filter
export async function getProductsByCategory(categoryId) {
  try {
    const url = buildUrlWithParams(Urls.getProductsByCategory, {
      category_id: categoryId,
    });
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error(`error in function getProductsByCategory: `, error);
    return null;
  }
}

// GET request with query parameters — shakti-products index w/ subcategory_id filter
export async function getProductsBySubcategory(subcategoryId) {
  try {
    const url = buildUrlWithParams(Urls.getProductsBySubcategory, {
      subcategory_id: subcategoryId,
    });
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error(`error in function getProductsBySubcategory: `, error);
    return null;
  }
}

// GET request with query parameters — shakti-products index w/ both filters
export async function getProductsByFilter({ categoryId, subcategoryId } = {}) {
  try {
    const url = buildUrlWithParams(Urls.getProductsByFilter, {
      category_id: categoryId,
      subcategory_id: subcategoryId,
    });
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error(`error in function getProductsByFilter: `, error);
    return null;
  }
}

// POST request
export async function addToCart(body) {
  try {
    const result = await Client(Urls.addToCart, body, "post");
    return result;
  } catch (error) {
    console.error(`error in function addToCart: `, error);
    return null;
  }
}

export async function loginUser(email, password) {
  try {
    const url = Urls.login;
    const payload = { email, password };
    const result = await Client(url, payload, "post");
    return result;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Invalid email or password"
    );
  }
}

export async function getUserAddresses(email) {
  try {
    const url = `${Urls.getAddressList}?email=${email}`;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error(`error in function getUserAddresses: `, error);
    return null;
  }
}

// Shakti-products index — paginated response
export async function getAllProducts() {
  try {
    const url = Urls.getAllProducts;
    const response = await Client(url, {}, "get");
    return response; // full axios response
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return {
      status: 500,
      data: { success: false, data: { data: [] } },
    };
  }
}

export async function getAllCategories() {
  try {
    const url = Urls.getAllCategories;
    const response = await Client(url, {}, "get");
    return response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

export async function addToWishlist(body = {}) {
  try {
    const result = await Client(Urls.addToWishlist, body, "post");
    return result;
  } catch (error) {
    console.error(`error in function addToWishlist: `, error);
    return null;
  }
}

export async function removeFromWishlist(body = {}) {
  try {
    const result = await Client(Urls.removeFromWishlist, body, "post");
    return result;
  } catch (error) {
    console.error(`error in function removeFromWishlist: `, error);
    return null;
  }
}

export async function getWishlistProducts(body = {}) {
  try {
    const result = await Client(Urls.getWishlistProducts, body, "get");
    return result;
  } catch (error) {
    console.error(`error in function getWishlistProducts: `, error);
    return null;
  }
}

export async function getOrders() {
  try {
    const result = await Client(Urls.getOrders, {}, "get");
    return result;
  } catch (error) {
    console.error("getOrders error", error);
    return null;
  }
}

export async function logoutUser(email) {
  try {
    const body = { email: email };
    const result = await Client(Urls.logout, body, "post");
    return result;
  } catch (error) {
    console.error("error in function logoutUser:", error);
    return null;
  }
}

export async function removeCartProduct(body) {
  try {
    const result = await Client(Urls.removeFromCart, body, "post");
    return result;
  } catch (error) {
    console.error("error in removeCartProduct:", error);
    return null;
  }
}

export async function registerUser(body = {}) {
  try {
    const result = await Client(Urls.register, body, "post");
    return result;
  } catch (error) {
    console.error(`error in function registerUser: `, error);
    return null;
  }
}

// Shakti-products show — GET /admin/shakti-products/{id} — path param, single product
export async function getProductById(productId) {
  try {
    const url = `${Urls.getProductById}/${productId}`;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error("getProductById error", error);
    return null;
  }
}

// Shakti-products inventory — GET /admin/shakti-products/{id}/inventory
export const getProductQuantities = (productId) => {
  return Client(
    `${Urls.getQuantityByProductId}${productId}/inventory`,
    {},
    "get",
  );
};

export async function getUserInfo(email, token) {
  try {
    const url = `${Urls.userInfo}?email=${encodeURIComponent(email)}`;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error("error in getUserInfo:", error);
    return null;
  }
}

export const updateUserInfo = async (email, payload) => {
  try {
    const url = `${Urls.updateUser}?email=${encodeURIComponent(email)}`;
    const result = await Client(url, payload, "put");
    return result;
  } catch (error) {
    console.error("error in updateUserInfo:", error);
    return null;
  }
};

export const addAddress = (email, payload, token) => {
  try {
    const url = `${Urls.addAddress}?email=${encodeURIComponent(email)}`;
    const result = Client(url, payload, "post", {
      Authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.error("error in addAddress:", error);
    return null;
  }
};

export const updateAddress = async (email, payload, token) => {
  try {
    console.log("payload", payload);
    const url = `${Urls.updateAddress}/${payload.id}?email=${encodeURIComponent(email)}`;
    const result = await Client(url, payload, "put", {
      Authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.error("error in updateAddress:", error);
    return null;
  }
};

export async function removeAddress(body, email) {
  try {
    const result = await Client(
      `${Urls.deleteAddress}?email=${email}`,
      body,
      "delete",
    );
    return result;
  } catch (error) {
    console.error("error in removeAddress:", error);
    return null;
  }
}

export async function placeOrder(body) {
  try {
    const result = await Client(Urls.placeOrder, body, "post");
    return result;
  } catch (error) {
    console.error(`error in function placeOrder: `, error);
    return null;
  }
}

export async function addProductReview(payload) {
  try {
    const url = `${Urls.addProductReview}`;
    const result = await Client(url, payload, "post");
    return result;
  } catch (error) {
    console.error("addProductReview error", error);
    return null;
  }
}

export async function getProductReviews(productId) {
  try {
    const url = `${Urls.getProductReviews}/${productId}`;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error("getProductReviews error", error);
    return null;
  }
}

export async function createOrder(payload) {
  try {
    const result = await Client(Urls.placeOrder, payload, "post");
    return result;
  } catch (error) {
    console.error(`error in function createOrder: `, error);
    return null;
  }
}

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export async function check_out({ order_id }) {
  const payload = { order_id };
  const result = await Client(Urls.checkout, payload, "post");
  return result;
}

export async function verify_checkout(payload) {
  const result = await Client(Urls.verify_checkout, payload, "post");
  return result;
}

export async function getbannerslist() {
  try {
    const url = Urls.getbannerslist;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error("getbannerslist error", error);
    return null;
  }
}