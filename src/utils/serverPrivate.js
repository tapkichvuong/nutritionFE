import useAxiosPrivate from "~/utils/axiosPrivate";

const useHook = () => {
    const axiosPrivate = useAxiosPrivate();

    const post = async (path, data = {}, config = {}) => {
        const response = await axiosPrivate.post(path, data, config);
        return response.data;
    };

    const get = async (path, config = {}) => {
        const response = await axiosPrivate.get(path, config);
        return response.data;
    };

    const put = async (path, data = {}, config = {}) => {
        const response = await axiosPrivate.put(path, data, config);
        return response.data;
    };

    const del = async (path, config = {}) => {
        const response = await axiosPrivate.delete(path, config);
        return response.data;
    };

    return { post, get, put, del };
};

export default useHook;
