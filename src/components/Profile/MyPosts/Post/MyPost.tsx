import s from './MyPost.module.css'

type PropsType = {
  message: string
  likesCount: string
}


const MyPost: React.FC<PropsType> = (props) => {
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