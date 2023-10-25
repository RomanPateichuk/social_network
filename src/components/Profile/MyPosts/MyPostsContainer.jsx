import MyPosts from './MyPosts';
import { addPostActionCreator } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
// import StoreContext from '../../../StoreContext';
// const MyPostsContainer = () => {
//   return (
//     <StoreContext.Consumer>{
//       (store) => {
//         let addPost = () => {
//           store.dispatch(addPostActionCreator())
//         }
//         let onPostChange = (text) => {
//           store.dispatch(updateNewPostTextActionCreator(text))
//         }
//         return <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={store.getState().profilePage.posts} newPostText={store.getState().profilePage.newPostText} />
//       }
//     }
//     </StoreContext.Consumer>
//   )

// }

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPostActionCreator(post))
    }
  }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;