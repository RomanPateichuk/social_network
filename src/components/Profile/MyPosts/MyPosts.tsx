import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';
import React from "react"
import AddNewPostFormRedux, { AddPostFormValuesType } from './AddPostForm/AddPostForm';
import { PostType } from '../../../types/types';


export type MapPropsType = {
  posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (post: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
  let postsDataJSX = props.posts.map(item => <MyPost key={item.id} message={item.message} likesCount={item.likesCount} />)

  let onAddPost = (data: AddPostFormValuesType) => {
    props.addPost(data.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsDataJSX}
      </div>
    </div>
  );
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized