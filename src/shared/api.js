import axios from "axios";

export const api = axios.create({
  baseURL: "https://openmarket.weniv.co.kr/",
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken !== undefined) {
    config.headers.common["authorization"] = jwtToken ? `JWT ${jwtToken}` : "";
  }
  return config;
});

export const apis = {
  // user
  signUp: (data) => api.post("accounts/signup/", data),
  dupcheck: (data) => api.post("accounts/signup/valid/username/", data),
  signIn: (data) => api.post("accounts/login/", data),
  signOut: (data) => api.post("accounts/logout/", data),
  // seller-user
  sellerSignUp: (data) => api.post("accounts/signup_seller/", data),
  // product
  getProduct: (page) => api.get(`products/?page=${page}`),
  getOneProduct: (id) => api.get(`products/${id}/`),
  addProduct: (data) => api.post("products/", data),
  getSellerProduct: () => api.get("seller/"),
  deleteProduct: (id) => api.delete(`products/${id}/`),
  modifyProduct: (id, data) => api.put(`products/${id}/`, data),
  // cart
  addCart: (data) => api.post("cart/", data),
  getCart: () => api.get("cart/"),
  getItemCart: (id) => api.get(`cart/${id}/`),
  modifyQuantity: (id, data) => api.put(`cart/${id}/`, data),
  deleteItem: (id) => api.delete(`cart/${id}/`),
  deleteAllItem: () => api.delete("cart/"),
  // order
  directOrder: (data) => api.post("order/", data),
  getOrder: (id, data) => api.get(`order/${id}`, data),
  // search
  searchProduct: (data) => api.get(`products/?search=${data}`),
};
