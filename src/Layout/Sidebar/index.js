import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FontAwesomeIcon icon={faHouse} />,
        to: '/',
        section: '',
    },
    {
        display: 'Getting Started',
        icon: <FontAwesomeIcon icon={faHouse} />,
        to: '/following',
        section: 'following',
    },
    {
        display: 'Calendar',
        icon: <FontAwesomeIcon icon={faHouse} />,
        to: '/upload',
        section: 'upload',
    },
    {
        display: 'User',
        icon: <FontAwesomeIcon icon={faHouse} />,
        to: '/search',
        section: 'search',
    }
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('a > div');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex((item) => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div ref={sidebarRef} className={cx('sidebar-menu')}>
                    <div
                        ref={indicatorRef}
                        className={cx('indicator')}
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
                        }}
                    ></div>
                    {sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={cx('item') + " " + cx(`${activeIndex === index ? 'active' : ''}`)}>
                                <div className={cx('item-icon')}>{item.icon}</div>
                                <div className={cx('item-text')}>{item.display}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
