import useHook from '~/utils/serverPrivate';

export const useGetComment = () => {
    const {get} = useHook();
    const getComment = (postId, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = `v1/posts/${postId}/comments`;
        const config = {
            headers: myHeaders,
        };
        const res = get(path, config);
        return res;
    }
    return getComment;
}

export const useCreateComment = () => {
    const {post} = useHook();
    const createComment = (postId, body, parentId, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
        };
        let path = `v1/posts/${postId}/comments`;
        const config = {
            headers: myHeaders,
            params: {
                body,
                parentId,
            },
        };
        const res = post(path, {}, config);
        return res;
    }
    return createComment;
}

export const useUpdateComment = () => {
    const {put} = useHook();
    const updateComment = (postId, body, id, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = `v1/posts/${postId}/comments/${id}`;
        const config = {
            headers: myHeaders,
            params: {
                body,
            },
        };
        const res = put(path, {}, config);
        return res;
    }
    return updateComment;
}

export const useDeleteComment = () => {
    const {del} = useHook();
    const deleteComment = (postId, id, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = `v1/posts/${postId}/comments/${id}`;
        const config = {
            headers: myHeaders,
        };
        const res = del(path, config);
        return res;
    }
    return deleteComment;
}

export const useToggleCommentLike = () => {
    const {post} = useHook();
    const toggleCommentLike = (id, postId, access_token) => {
        var myHeaders = {
            Authorization: `Bearer ${access_token}`,
            redirect: 'follow',
        };
        let path = `v1/posts/${postId}/comments/${id}/toggleLike`;
        const config = {
            headers: myHeaders,
        };
        const res = post( path, {}, config);
        return res;
    }
    return toggleCommentLike;
}
