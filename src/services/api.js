import axios from 'axios';

const API_URL = '/api';

export const addProgram = async (data) => {
    return await axios.post(`${API_URL}/admin/programs`, data);
};

export const uploadImage = async (formData) => {
    return await axios.post(`${API_URL}/upload/single`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};