import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './IconBtn.module.scss';
const cx = classNames.bind(styles);
export function IconBtn({ Icon, isActive, color, children, ...props }) {
    return (
        <button
            className={
                cx('btn') + ' ' + cx('icon-btn') + ' ' + (isActive ? cx('icon-btn-active') : '') + ' ' + cx(color)
            }
            {...props}
        >
            <span className={children != null ? cx('mr-1') : ''}>
                <FontAwesomeIcon icon={Icon} />
            </span>
            {children}
        </button>
    );
}
