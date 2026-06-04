import axios from "axios";

const API = "http://localhost:5000/api/city";

export const getCities = () => axios.get(API);

export const addCity = (data) => axios.post(`${API}/add`, data);

export const updateCity = (id, data) => axios.put(`${API}/${id}`, data);

export const deleteCity = (id) => axios.delete(`${API}/${id}`);
