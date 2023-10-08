import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.postsData.posts} newPostText={props.postsData.newPostText} dispatch={props.dispatch} />
    </div >
  );
}


export default Profile;