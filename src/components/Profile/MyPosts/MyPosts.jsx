import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';
import React from "react"

const MyPosts = (props) => {
  let postsDataJSX = props.posts.map(item => <MyPost key={item.id} message={item.message} likesCount={item.likesCount} />)
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost()
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    props.updateNewPostText(text)

  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea>
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsDataJSX}
      </div>
    </div>
  );
}


export default MyPosts;