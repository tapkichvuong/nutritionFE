import axios from 'axios';

const localRequest = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export const post = async (path, options = {}) => {
    const response = await localRequest.post(path, options);
    return response.data;
};

export default localRequest;