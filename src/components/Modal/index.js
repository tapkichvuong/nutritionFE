import classNames from 'classnames/bind';
import ImageCropper from '~/components/ImageCropper';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const Modal = ({ updateAvatar, closeModal }) => {
    return (
        <div className={cx('crop-dialog')} aria-labelledby="crop-image-dialog" role="dialog" aria-modal="true">
            <div className={cx('backdrop')}></div>
            <div className={cx('overlay')}>
                <div className={cx('dialog-content')}>
                    <div className={cx('dialog-box')}>
                        <div className={cx('warrper')}>
                            <button type="button" className={cx('close-button')} onClick={closeModal}>
                                <FontAwesomeIcon icon={faXmark} className={cx('close-icon')}/>
                            </button>
                            <ImageCropper updateAvatar={updateAvatar} closeModal={closeModal} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal;
