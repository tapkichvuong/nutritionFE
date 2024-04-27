import { Comment } from '~/components/Comment';
import classNames from 'classnames/bind';
import styles from './CommentList.module.scss';
const cx = classNames.bind(styles);
export function CommentList({ comments }) {
    return comments.map((comment) => (
        <div key={comment.id} className="comment-stack">
            <Comment {...comment} />
        </div>
    ));
}
