import { useState } from 'react';
import PostItem from '../PostItem';
import Logo from '~/assets/images/logo.jpeg';
import styles from './Posts.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DUMMY_POST = [
    {
        id: '1',
        thumbnail: Logo,
        category: 'category',
        title: 'title title title title title title title title title',
        desc: 'description description description descriptionvv description description description description description description',
        authorID: 1,
    },
    {
        id: '2',
        thumbnail: Logo,
        category: 'category',
        title: 'title',
        desc: 'description',
        authorID: 1,
    },
    {
        id: '3',
        thumbnail: Logo,
        category: 'category',
        title: 'title',
        desc: 'description',
        authorID: 1,
    },
];

function Posts() {
    const [posts, setPosts] = useState(DUMMY_POST);
    return (
        <section className={cx('posts')}>
                {posts.map(({ id, category, title, desc, authorID, thumbnail }) => (
                    <PostItem
                        key={id}
                        postID={id}
                        category={category}
                        title={title}
                        desc={desc}
                        authorID={authorID}
                        thumbnail={thumbnail}
                    />
                ))}
        </section>
    );
}

export default Posts;
