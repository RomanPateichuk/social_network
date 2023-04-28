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

        <MyPost message='Hi, how are you' likesCount='0' />
        <MyPost message="It's, my first post" likesCount='23' />
        <MyPost message="It's, my first post" />
        <MyPost message="It's, my first post" />
        <MyPost message="It's, my first post" />
        <MyPost message="It's, my first post" />
      </div>
    </div>
  );
}


export default MyPosts;