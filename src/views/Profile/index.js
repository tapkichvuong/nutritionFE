import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Posts from '~/components/Posts';
const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('container')}>
            <section className={cx('author-bio')}>
                <div className={cx('author-bio__title')}>
                    <Link to="/profile/aba">
                        <Image
                            src="https://secure.gravatar.com/avatar/079be27600be4444562a48cc77b84d5f?s=300&d=mm&r=g"
                            className={cx('author-avatar')}
                        />
                    </Link>

                    <Link to="/profile/aba">
                        <h4>ABC</h4>
                    </Link>
                </div>
                <div>
                    Tôi là ABC. Tôi đã tốt nghiệp trường Đại học Công Nghiệp Thực Phẩm TP.HCM ngành Khoa
                    học dinh dưỡng và ẩm thực. Hiện tôi đang công tác tại XYZ - Hệ thống Dinh dưỡng y học
                    đầu tiên tại Việt Nam. Với mong muốn mang đến cho khách hàng những kiến thức y khoa và những lựa
                    chọn sản phẩm dinh dưỡng tối ưu cho sức khỏe vàng và mang lại sức khỏe tốt nhất cho cộng đồng thông
                    qua việc thay đổi chế độ dinh dưỡng cũng như lối sống lành mạnh. Tôi luôn sẵn sàng học hỏi, trau dồi
                    kiến thức y khoa để mang đến cho khách hàng những giải pháp dinh dưỡng tối ưu nhất.
                </div>
            </section>
            <Posts />
        </div>
    );
}

export default Profile;
