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

// GET request with query parameters
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

export async function getAllProducts() {
  try {
    const url = Urls.getAllProducts;

    const response = await Client(url, {}, "get");

    return response; // full axios response
  } catch (error) {
    console.error("Error in getAllProducts:", error);

    return {
      status: 500,
      data: {
        success: false,
        data: [],
      },
    };
  }
}

// service/api.js
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

// export async function getProductsByCategory(categoryId) {
//   try {
//     const url = `${Urls.getProductsByCategory}?category_id=${categoryId}`;
//     const response = await Client(url, {}, "get");
//     return response;
//   } catch (error) {
//     console.error("getProductsByCategory error", error);
//     return null;
//   }
// }

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
    const body = {
      email: email,
    };

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

// export async function getProductById(productId) {
//   try {
//     const url = buildUrlWithParams(Urls.getProductById, {
//       product_id: productId,
//     });
//     return await Client(url, {}, "get");
//   } catch (error) {
//     console.error("getProductById error", error);
//     return null;
//   }
// }

export async function getProductById(productId) {
  try {
    const url = `${Urls.getProductById}?product_id=${productId}`;
    const result = await Client(url, {}, "get");
    return result;
  } catch (error) {
    console.error("getProductById error", error);
    return null;
  }
}

export const getProductQuantities = (productId) => {
  return Client(
    `${Urls.getQuantityByProductId}${productId}/quantities`,
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

export const addAddress = (email, payload) => {
  try {
    const url = `${Urls.addAddress}?email=${encodeURIComponent(email)}`;
    const result = Client(url, payload, "post");
    return result;
  } catch (error) {
    console.error("error in addAddress:", error);
    return null;
  }
};

export const updateAddress = async (email, payload) => {
  try {
    const url = `${Urls.updateAddress}?email=${encodeURIComponent(email)}`;
    const result = await Client(url, payload, "put");
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
    // console.log(result);

    return result;
  } catch (error) {
    console.error(`error in function createOrder: `, error);
    return null;
  }
}

// export async function payment(orderId) {
//   try {
//     const body = {
//       order_id: "ORD1769708030",
//     };

//     const result = await Client(Urls.checkout, body, "post");
//     debugger
//     // same validation as reference code
//     if (!result?.success) {
//       throw new Error(result?.message || "Checkout failed");
//     }

//     return result.checkout; // return only checkout data
//   } catch (error) {
//     console.error("error in function payment:", error);
//     return null;
//   }
// }

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
  // console.log("result", result);
  return result;
}

export async function verify_checkout(payload) {
  // const payload = {
  //   razorpay_payment_id: "pay_S9o7fjfW8ruJ40",
  //   razorpay_order_id: "order_S9o5xGEkZNIZgt",
  //   razorpay_signature:
  //     "a557c7569471d10d4e0d720409058f9968ce5e958c43389a6fc4c1662dd1fb0c",
  // };
  // {
  //   "razorpay_order_id": "order_S9o5xGEkZNIZgt",
  //   "razorpay_payment_id": "pay_S9o2fZ5LT07MJB",
  //   "razorpay_signature": "ae0f5db68e1ac0d5edbc45aa383e9d21a85e6378033016630e9226cd4cd58513"
  // }
  const result = await Client(Urls.verify_checkout, payload, "post");
  // console.log("result", result);
  return result;
}

// import { loadRazorpay } from "./utils/loadRazorpay";
