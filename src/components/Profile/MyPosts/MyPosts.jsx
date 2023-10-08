import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';
import React from "react"
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/state'
const MyPosts = (props) => {
  let postsDataJSX = props.posts.map(item => <MyPost key={item.id} message={item.message} likesCount={item.likesCount} />)

  let newPostElement = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator())
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    props.dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsDataJSX}
      </div>
    </div>
  );
}


export default MyPosts;