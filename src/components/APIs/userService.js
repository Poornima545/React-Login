import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const createUser = async (data) => {
    return await axios.post(API_URL, data);
}

export const getUsers = async (id) => {
    const url = id ? `${API_URL}/${id}` : API_URL;
    return await axios.get(url);
}

export const updateUser = async (id, updateData) => {
    return await axios.put(`${API_URL}/${id}`, updateData);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
}
