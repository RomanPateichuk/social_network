import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';

const MyPosts = () => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <div className={s.posts}>

        <MyPost message='Hi, how are you' />
        <MyPost message="It's, my first post" />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
      </div>
    </div>
  );
}


export default MyPosts;