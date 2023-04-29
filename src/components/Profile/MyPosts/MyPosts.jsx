import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';


let postsData = [
  { id: "1", message: "'Hi, how are you", likeCount: "0" },
  { id: "2", message: "'Hi, how are you", likesCount: '23' },
  { id: "3", message: "It's, my first post", likesCount: "0" },
  { id: "4", message: "It's, my first post", likesCount: "0" },
  { id: "5", message: "It's, my first post", likesCount: "0" },
  { id: "6", message: "It's, my first post", likesCount: "0" },
]


let postsDataJSX = postsData.map(item => <MyPost message={item.message} likesCount={item.likesCount} />)

const MyPosts = () => {
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