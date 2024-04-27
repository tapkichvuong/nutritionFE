import { useState } from "react"
import classNames from "classnames/bind";
import styles from './Comment.module.scss';
const cx = classNames.bind(styles);
export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(message).then(() => setMessage(""))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={cx("comment-form-row")}>
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={cx("message-input")}
        />
        <button className={cx("btn")} type="submit" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className={cx("error-msg")}>{error}</div>
    </form>
  )
}