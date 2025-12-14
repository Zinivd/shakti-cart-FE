import axios from "axios";


export async function Client(endpoint, body, method) {
  try {
    const accessToken = localStorage.getItem("access-token");


    const headers = {
      "access-token": accessToken,
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await axios({
      url: endpoint,
      method: method,
      headers: headers,
      data: body,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      return error.response;
    }

    return { 
      status: 500,
      data: null,
      message: "Internal Server Error",
    };
  }
}
