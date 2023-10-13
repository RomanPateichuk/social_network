import MyPosts from './MyPosts';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profile-reducer'
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
    newPostText: state.profilePage.newPostText,
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)




export default MyPostsContainer;