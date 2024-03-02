import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <h1>Sidebar</h1>
    </div>
  );
}

export default Sidebar;
