import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

const NotFound = () => (
    <div className="not-found">
        <div class={cx('notfound')}>
            <div class={cx('notfound-404')}>
                <h1>Oops!</h1>
            </div>
            <h2>404 - Page not found</h2>
            <p>
                The page you are looking for might have been removed had its name changed or is temporarily unavailable.
            </p>
            <Link to="/" className={cx('link-home')}>
                GO TO HOMEPAGE
            </Link>
        </div>
    </div>
);

export default NotFound;
