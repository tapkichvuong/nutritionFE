import { useState, useEffect } from 'react';
import PostItem from '../PostItem';
import Logo from '~/assets/images/logo.jpeg';
import styles from './Posts.module.scss';
import classNames from 'classnames/bind';
import useAuth from '~/hooks/useAuth';
import { useGetAllPost } from '~/services/postServices';

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
    const [isLoading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const getAllPost = useGetAllPost();
    useEffect(() => {
        setLoading(true);
        const fetchAllPost = async () => {
            
                try {
                    const response = await getAllPost();
                    console.log(response);
                    setPosts(response);
                } catch (error) {
                    console.error('Error fetching post:', error);
                    // Handle error, e.g., redirect to an error page
                }
            
        };

        fetchAllPost();
        setLoading(false);
    }, []);
    return (
        <section className={cx('posts')}>
            {isLoading ? <h1>Loading...</h1> :posts.length > 0 ? (
                <div>
                    {posts.map(({ id, category, title, body, thumbnail, firstName, lastName, avatar }) => (
                        <PostItem
                            key={id}
                            postID={id}
                            category={category}
                            title={title}
                            desc={body}
                            thumbnail={thumbnail}
                            firstName={firstName}
                            lastName={lastName}
                            avatar={avatar}
                        />
                    ))}
                </div>
            ) : (
                <h2 className={cx('center')}>No posts founds</h2>
            )}
        </section>
    );
}

export default Posts;
