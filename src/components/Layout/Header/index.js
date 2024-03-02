import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/image/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" height={42}></img>
                </div>
                <div className={cx('search')}>
                    <input className={cx('search-input')} placeholder="Search"></input>
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <span className={cx('spliter')}></span>
                    <button className={cx('search-btn')}>
                        {' '}
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('options')}></div>
            </div>
        </header>
    );
}

export default Header;
