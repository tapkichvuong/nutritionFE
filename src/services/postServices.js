import useHook from '~/utils/serverPrivate';
import * as serverPublic from '~/utils/serverPublic';

export const useUpload = () => {
    const { post } = useHook();
    const upload = (title, category, body, thumbnail, access_token) => {
        var bodyFormData = new FormData();
        bodyFormData.append('title', title);
        bodyFormData.append('category', category);
        bodyFormData.append('body', body);
        bodyFormData.append('thumbnail', thumbnail);

        var myHeaders = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = 'v1/doctor/posts';
        const config = {
            headers: myHeaders,
        };
        const res = post(path, bodyFormData, config);
        return res;
    };
    return upload;
};

export const useModify = () => {
    const { put } = useHook();
    const modify = (postId, title, category, body, thumbnail, access_token) => {
        var bodyFormData = new FormData();
        bodyFormData.append('title', title);
        bodyFormData.append('category', category);
        bodyFormData.append('body', body);
        bodyFormData.append('thumbnail', thumbnail);

        var myHeaders = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = `v1/doctor/posts/${postId}`;
        const config = {
            headers: myHeaders,
        };
        const res = put(path, bodyFormData, config);
        return res;
    };
    return modify;
};

export const useGetPost = () => {
    const { get } = useHook();
    const getPost = (postId, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
        };
        let path = `v1/posts/${postId}`;
        const config = {
            headers: myHeaders,
        };
        const res = get(path, config);
        return res;
    };
    return getPost;
};

export const useGetAllPost = () => {
    const getAllPost = () => {
        let path = `v1/posts`;
        const res = serverPublic.get(path);
        return res;
    };
    return getAllPost;
};
