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
      category_id: categoryId
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

    const payload = {
      email,
      password,
    };

    const result = await Client(url, payload, "post");
    return result;
  } catch (error) {
    console.error(`error in function loginUser: `, error);
    return null;
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
    const url = Urls.getAllProducts; // "/api/product/all"

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
    const result = await Client(
      Urls.removeFromCart,
      body,
      "post"  
    );
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
    const url = `http://127.0.0.1:8000/api/product/by-id?product_id=${productId}`;
    return await Client(url, {}, "get");
  } catch (error) {
    console.error("getProductById error", error);
    return null;
  }
}
