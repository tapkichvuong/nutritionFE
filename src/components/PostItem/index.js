import { Link } from 'react-router-dom';
import Image from '../Image';
import styles from './PostItem.module.scss';
import classNames from 'classnames/bind';
import AccountItem from '../AccountItem';
const cx = classNames.bind(styles);

function PostItem({ postID, category, title, desc, thumbnail, firstName, lastName, avatar }) {
    const USER = {
        firstName: firstName,
        lastName: lastName,
        avatar: avatar
    };
    const extractTextFromHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return Array.from(tempDiv.children)
            .map(child => child.textContent || child.innerText || '')
            .join(' ');
    };
    const shortDesc = extractTextFromHtml(desc).length > 145 ? extractTextFromHtml(desc).substr(0, 145) + '...' : extractTextFromHtml(desc);;
    const shortTitle = title.length > 30 ? title.substr(0, 145) + '...' : title;
    return (
        <article className={cx('post')}>
            <Link to={`/post/${postID}`}>
                <div className={cx('post-thumbnail')}>
                    <Image src={thumbnail} alt={title} />
                </div>
                <div className={cx('post-content')}>
                    <h3>{shortTitle}</h3>
                    <p>{shortDesc}</p>
                </div>
            </Link>
            <div className={cx('post-footer')}>
                <AccountItem data={USER} />
                <Link to={`/posts/categories/${category}`} className={cx('category')}>
                    {category}
                </Link>
            </div>
        </article>
    );
}

export default PostItem;
