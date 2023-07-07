import { API_URL } from "actions/constants/constants";
import axios from 'axios'

export const getSubCategoryByCategoryCode = (category) => {
    // http://localhost:8080/api/subcategory/category?category=sach
    return axios.get(`${API_URL}/api/subcategory/category?category=${category}`)
}