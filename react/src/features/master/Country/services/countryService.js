import axios from "axios";

const API = "http://localhost:5000/api/country";

export const getCountry = () => axios.get(API);
export const addCountry = (data) => axios.post(`${API}/add`, data);

export const updateCountry = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteCountry = (id) => axios.delete(`${API}/${id}`);
