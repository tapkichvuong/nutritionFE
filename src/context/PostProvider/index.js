import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '~/hooks/useAsync';
import { useGetComment } from '~/services/commentServices';
import useAuth from '~/hooks/useAuth';

const Context = React.createContext({});

export function usePost() {
    return useContext(Context);
}

export function PostProvider({ children }) {
    const { auth } = useAuth();
    const { id } = useParams();
    const getComment = useGetComment();
    const { loading, error, value: res } = useAsync(() => getComment(id, auth?.accessToken), [id]);
    const [comments, setComments] = useState([]);
    const commentsByParentId = useMemo(() => {
        const group = {};
        comments.forEach((comment) => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment);
        });
        return group;
    }, [comments]);

    const rootComments = useMemo(() => {
        return commentsByParentId[0];
    }, [commentsByParentId]);

    useEffect(() => {
        if (res == null) return;
        setComments(res);
    }, [res]);

    function getReplies(parentId) {
        return commentsByParentId[parentId];
    }

    function createLocalComment(comment) {
        setComments((prevComments) => {
            return [comment, ...prevComments];
        });
    }

    function updateLocalComment(id, message) {
        setComments((prevComments) => {
            return prevComments.map((comment) => {
                if (comment.id === id) {
                    return { ...comment, message };
                } else {
                    return comment;
                }
            });
        });
    }

    function deleteLocalComment(id) {
        setComments((prevComments) => {
            return prevComments.filter((comment) => comment.id !== id);
        });
    }

    function toggleLocalCommentLike(id, addLike) {
        setComments((prevComments) => {
            return prevComments.map((comment) => {
                if (id === comment.id) {
                    if (addLike === 'true') {
                        return {
                            ...comment,
                            likeCount: comment.likeCount + 1,
                            likedByMe: true,
                        };
                    } else {
                        return {
                            ...comment,
                            likeCount: comment.likeCount - 1,
                            likedByMe: false,
                        };
                    }
                } else {
                    return comment;
                }
            });
        });
    }

    return (
        <Context.Provider
            value={{
                postId: id,
                rootComments,
                getReplies,
                createLocalComment,
                updateLocalComment,
                deleteLocalComment,
                toggleLocalCommentLike,
            }}
        >
            {loading ? <h1>Loading</h1> : error ? <h1 className="error-msg">{error}</h1> : children}
        </Context.Provider>
    );
}
