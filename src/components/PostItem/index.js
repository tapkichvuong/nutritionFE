import { Link } from 'react-router-dom';
import Image from '../Image';
import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import AccountItem from '../AccountItem';
const cx = classNames.bind(styles);

const USER = {
    nickname: 'aba',
    full_name: 'aaa',
};
function PostItem({ postID, category, title, desc, authorID, thumbnail }) {
    const shortDesc = desc.length > 145 ? desc.substr(0, 145) + '...' : desc;
    const shortTitle = title.length > 30 ? title.substr(0, 145) + '...' : title;
    return (
        <Link to={`/post/${postID}`}>
            <article className={cx('post')}>
                <div className={cx('post-thumbnail')}>
                    <Image src={thumbnail} alt={title} />
                </div>
                <div className={cx('post-content')}>
                    <h3>{shortTitle}</h3>
                    <p>{shortDesc}</p>
                    <div className={cx('post-footer')}>
                        <AccountItem data={USER} />
                        <Link to={`/posts/categories/${category}`} className={cx('category')}>
                            {category}
                        </Link>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default PostItem;
