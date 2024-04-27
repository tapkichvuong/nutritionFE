import Posts from "~/components/Posts";
import classNames from "classnames/bind";
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    return <div className={cx('wrapper')}>
        <Posts/>
    </div>;
}

export default Home;
