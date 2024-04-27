import { IconBtn } from '~/components/IconBtn';
import { faEdit, faHeart, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';
import { CommentList } from '~/components/CommentList';
import { useState } from 'react';
import { useAsyncFn } from '~/hooks/useAsync';
import { useCreateComment, useDeleteComment, useToggleCommentLike, useUpdateComment } from '~/services/commentServices';
import { CommentForm } from '~/components/CommentForm';
import useAuth from '~/hooks/useAuth';
import { usePost } from '~/context/PostProvider';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function Comment({ id, body, userName, firstName, lastName, createdAt, likeCount, likedByMe }) {
    const fullName = firstName + ' ' + lastName;
    const [areChildrenHidden, setAreChildrenHidden] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { postId, getReplies, createLocalComment, updateLocalComment, deleteLocalComment, toggleLocalCommentLike } =
        usePost();
    const createComment = useCreateComment();
    const updateComment = useUpdateComment();
    const deleteComment = useDeleteComment();
    const toggleCommentLike = useToggleCommentLike();
    const createCommentFn = useAsyncFn(createComment);
    const updateCommentFn = useAsyncFn(updateComment);
    const deleteCommentFn = useAsyncFn(deleteComment);
    const toggleCommentLikeFn = useAsyncFn(toggleCommentLike);
    const childComments = getReplies(id);
    const { auth } = useAuth();

    function onCommentReply(body) {
        return createCommentFn.execute(postId, body, id, auth?.accessToken).then((comment) => {
            setIsReplying(false);
            createLocalComment(comment);
        });
    }

    function onCommentUpdate(body) {
        return updateCommentFn.execute(postId, body, id, auth?.accessToken).then((comment) => {
            setIsEditing(false);
            updateLocalComment(id, comment.body);
        });
    }

    function onCommentDelete() {
        return deleteCommentFn.execute(postId, id, auth?.accessToken).then((comment) => deleteLocalComment(comment.id));
    }

    function onToggleCommentLike() {
        return toggleCommentLikeFn
            .execute(id, postId, auth?.accessToken)
            .then(({ addLike }) => toggleLocalCommentLike(id, addLike));
    }

    return (
        <>
            <div className={cx('comment')}>
                <div className={cx('header')}>
                    <span className={cx('name')}>{fullName}</span>
                    <span className={cx('date')}>{dateFormatter.format(Date.parse(createdAt))}</span>
                </div>
                {isEditing ? (
                    <CommentForm
                        autoFocus
                        initialValue={body}
                        onSubmit={onCommentUpdate}
                        loading={updateCommentFn.loading}
                        error={updateCommentFn.error}
                    />
                ) : (
                    <div className={cx('message')}>{body}</div>
                )}
                <div className={cx('footer')}>
                    <IconBtn
                        onClick={onToggleCommentLike}
                        disabled={toggleCommentLikeFn.loading}
                        Icon={likedByMe ? faHeart : faRegHeart}
                        aria-label={likedByMe ? 'Unlike' : 'Like'}
                    >
                        {likeCount}
                    </IconBtn>
                    <IconBtn
                        onClick={() => setIsReplying((prev) => !prev)}
                        isActive={isReplying}
                        Icon={faReply}
                        aria-label={isReplying ? 'Cancel Reply' : 'Reply'}
                    />
                    {userName === auth?.user && (
                        <>
                            <IconBtn
                                onClick={() => setIsEditing((prev) => !prev)}
                                isActive={isEditing}
                                Icon={faEdit}
                                aria-label={isEditing ? 'Cancel Edit' : 'Edit'}
                            />
                            <IconBtn
                                disabled={deleteCommentFn.loading}
                                onClick={onCommentDelete}
                                Icon={faTrash}
                                aria-label="Delete"
                                color="danger"
                            />
                        </>
                    )}
                </div>
                {deleteCommentFn.error && (
                    <div className={cx('error-msg') + ' ' + cx('mt-1')}>{deleteCommentFn.error}</div>
                )}
            </div>
            {isReplying && (
                <div className={cx('ml-3') + ' ' + cx('mt-1')}>
                    <CommentForm
                        autoFocus
                        onSubmit={onCommentReply}
                        loading={createCommentFn.loading}
                        error={createCommentFn.error}
                    />
                </div>
            )}
            {childComments?.length > 0 && (
                <>
                    <div className={cx('nested-comments-stack') + ' ' + (areChildrenHidden ? cx('hide') : '')}>
                        <button
                            className={cx('collapse-line')}
                            aria-label="Hide Replies"
                            onClick={() => setAreChildrenHidden(true)}
                        />
                        <div className={cx('nested-comments')}>
                            <CommentList comments={childComments} />
                        </div>
                    </div>
                    <button
                        className={cx('btn') + ' ' + cx('mt-1') + ' ' + (!areChildrenHidden ? cx('hide') : '')}
                        onClick={() => setAreChildrenHidden(false)}
                    >
                        Show Replies
                    </button>
                </>
            )}
        </>
    );
}
