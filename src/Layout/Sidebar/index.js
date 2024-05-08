import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faRobot } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
const sidebarNavItems = [
    {
        display: 'Home',
        icon: <FontAwesomeIcon icon={faHouse} />,
        to: '/',
        section: '',
    },
    {
        display: 'My Post',
        icon: <FontAwesomeIcon icon={faBook} />,
        to: '/post',
        section: 'mypost',
    },
    {
        display: 'Chat Bot',
        icon: <FontAwesomeIcon icon={faRobot} />,
        to: '/chatbot',
        section: 'chatbot',
    },
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
