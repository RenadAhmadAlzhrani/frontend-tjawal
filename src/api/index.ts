import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "http://localhost:5125/api/v1"

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = "https://asp-ecommerce-1wi5.onrender.com/"
}

const api = axios.create({
  baseURL
})


export default api
