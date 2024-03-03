import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.jpeg';
import Search from '../Search';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="Logo" height={42}></img>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Button text>Upload</Button>
                    <Button primary>Login</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
