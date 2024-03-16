import { Link } from 'react-router-dom';

import cloud1 from '~/assets/images/cloud-1.png';
import cloud2 from '~/assets/images/cloud-2.png';
import cloud3 from '~/assets/images/cloud-3.png';
import cloud4 from '~/assets/images/cloud-4.png';
import character from '~/assets/images/character-6.png';
import hand from '~/assets/images/hand-6.png';
import eye from '~/assets/images/eye-6.gif';
import classNames from 'classnames/bind';
import styles from './Unauthorized.module.scss';

const cx = classNames.bind(styles);
function Unauthorized() {
    return (
        <div>
            <div className={cx('cloudWrapper')}>
                <div className={cx('cloud') + ' ' + cx('cloud-1')}>
                    <img src={cloud1} alt="cloud1"></img>
                </div>
                <div className={cx('cloud') + ' ' + cx('cloud-2')}>
                    <img src={cloud2} alt="cloud2"></img>
                </div>
                <div className={cx('cloud') + ' ' + cx('cloud-3')}>
                    <img src={cloud3} alt="cloud3"></img>
                </div>
                <div className={cx('cloud') + ' ' + cx('cloud-4')}>
                    <img src={cloud4} alt="cloud4"></img>
                </div>
            </div>
            <div className={cx('unauthorized-wrap')}>
                <div className={cx('scene-unauth')}></div>
                <div className={cx('row-flex')}>
                    <div className={cx('messge-unathorized')}>
                        <h1>
                            <span>Stop</span> <br />
                            401 Unauthorized
                        </h1>
                        <p>You don't have the proper credentials to access this page</p>
                        <Link to="/" className={cx('link-home')}>
                            GO TO HOMEPAGE
                        </Link>
                    </div>
                </div>
                <div class={cx('charecter-6')}>
                    <img src={character} alt="character"></img>
                    <span class={cx('eye-6')}>
                        <img src={eye} alt="eye"></img>
                    </span>
                    <span class={cx('hand-6')}>
                        <img src={hand} alt="hand"></img>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
