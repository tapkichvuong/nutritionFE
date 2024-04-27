import axios from "axios";

const javaApiClient = axios.create({
    baseURL: process.env.REACT_APP_JAVA_URL,
});

export const post = async (path, data = {}, options = {}) => {
    const response = await javaApiClient.post(path,data, options);
    return response.data;
};

export const get = async (path, options = {}) => {
    const response = await javaApiClient.get(path, options);
    return response.data;
};

export default javaApiClient;