import s from './MyPost.module.css'

const MyPost = (props) => {
  return (
    <div className={s.item}>
      <img src="https://klike.net/uploads/posts/2021-08/1629443054_1.jpg" alt="post" />
      {props.message}
      <div>
        <span>like {props.likesCount}</span>
      </div>
    </div>
  );
}


export default MyPost;