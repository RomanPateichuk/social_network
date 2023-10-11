import MyPosts from './MyPosts';
import React from "react"
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profile-reducer'


const MyPostsContainer = (props) => {
  let state = props.store.getState()
  let addPost = () => {
    props.store.dispatch(addPostActionCreator())
  }

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text))
  }

  return (
    <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText} />
  );
}


export default MyPostsContainer;