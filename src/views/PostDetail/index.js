import React from 'react';
import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss';
import AccountItem from '~/components/AccountItem';
import { Link, useParams } from 'react-router-dom';
import Image from '~/components/Image';
import { useEffect, useState, useMemo } from 'react';
import useAuth from '~/hooks/useAuth';
import { useGetPost } from '~/services/postServices';
import { usePost } from '~/context/PostProvider';
import { useAsyncFn } from '~/hooks/useAsync';
import { useCreateComment } from '~/services/commentServices';
import { CommentForm } from '~/components/CommentForm';
import { CommentList } from '~/components/CommentList';

const cx = classNames.bind(styles);

function PostDetail() {
    const USER = useMemo(() => [], []);
    const { id } = useParams();
    const { auth } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const getPost = useGetPost();
    const createComment = useCreateComment();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const { rootComments, createLocalComment } = usePost();
    const { loading, error, execute: createCommentFn } = useAsyncFn(createComment);
    useEffect(() => {
        setLoading(true);
        const fetchPost = async () => {
            if (auth?.accessToken) {
                try {
                    const response = await getPost(id, auth?.accessToken);
                    setTitle(response.title);
                    setCategory(response.category);
                    setDescription(response.body);
                    setThumbnail(response.thumbnail);
                    USER.firstName = response.firstName;
                    USER.lastName = response.lastName;
                    USER.avatar = response.avatar;
                } catch (error) {
                    console.error('Error fetching post:', error);
                    // Handle error, e.g., redirect to an error page
                }
            }
        };

        fetchPost();
        setLoading(false);
    }, [id, auth?.accessToken, USER]);

    function onCommentCreate(message) {
        return createCommentFn(id, message, 0, auth?.accessToken).then(createLocalComment);
    }
    return isLoading ?<></> : (
        <div className={cx('post-detail')}>
            <section>
                <div className={cx('container')}>
                    <div className={cx('post-detail__header')}>
                        <AccountItem data={USER} />
                        <Link to={`/posts/categories/${category}`} className={cx('category')}>
                            {category}
                        </Link>
                    </div>
                    <h1>{title}</h1>
                    <div className={cx('post-detail__thumbnail')}>
                        <Image src={thumbnail} />
                    </div>
                    <div className={cx('post-detail__description')} dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </section>
            <h3 className={cx('comments-title')}>Comments</h3>
            <div>
                <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} />
                {rootComments != null && rootComments.length > 0 && (
                    <div className={cx('mt-4')}>
                        <CommentList comments={rootComments} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
