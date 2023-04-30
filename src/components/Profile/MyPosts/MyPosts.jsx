import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';

const MyPosts = (props) => {
  let postsDataJSX = props.posts.map(item => <MyPost message={item.message} likesCount={item.likesCount} />)
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsDataJSX}
      </div>
    </div>
  );
}


export default MyPosts;