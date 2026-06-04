import axios from "axios";

const API = "http://localhost:5000/api/state";

export const getStates = () => axios.get(API);
export const addStates = (data) => axios.post(`${API}/add`, data);
export const updateStates = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteStates = (id) => axios.delete(`${API}/${id}`);
