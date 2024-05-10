import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpeg';
import Search from '../Search';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Menu';
import Image from '~/components/Image';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Tippy from '@tippyjs/react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '~/hooks/useAuth';
import useLogout from '~/hooks/useLogout';
import { useGetProfile } from '~/services/userServices';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const logout = useLogout();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState('');
    const getProfile = useGetProfile();
    useEffect(() => {
        console.log(Object.keys(auth).length);
        setIsLoggedIn(Object.keys(auth).length !== 0);
        const getAvatar = async () => {
            try {
                const response = await getProfile(auth?.accessToken);
                setAvatar(response?.avatar);
            } catch (error) {
                console.error('Error fetching post:', error);
                // Handle error, e.g., redirect to an error page
            }
        };
        if (Object.keys(auth).length !== 0) {
            getAvatar();
        }
    }, [auth]);
    const nagivateUpload = () => {
        navigate('/post/upload');
    };
    const signOut = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        // try {
        //     const response = await logout(auth?.access_token);
        // } catch (err) {
        //     console.log(err);
        // }
        await logout();
        navigate('/');
    };
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'language':
                // Handle change language
                break;
            case 'Log out':
                signOut();
                break;
            default:
        }
    };
    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/myprofile',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <img src={logo} alt="Logo" height={42}></img>
                    </Link>
                </div>
                <Search />
                <div className={cx('actions')}>
                    {isLoggedIn ? (
                        <>
                            <Tippy arrow={true} content="Upload video" placement="bottom" duration={0}>
                                <button className={cx('action-btn')} onClick={nagivateUpload}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy arrow={true} content="Message" placement="bottom" duration={0}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy arrow={true} content="Inbox" placement="bottom" duration={0}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button to={`post/upload`} text>
                                Upload
                            </Button>
                            <Button to={`/login`} primary>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={isLoggedIn ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange}>
                        {isLoggedIn ? (
                            <Image className={cx('user-avatar')} src={avatar} alt="Nguyen Van A" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
