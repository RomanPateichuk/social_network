import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.postsData.posts} addPost={props.addPost} />
    </div >
  );
}


export default Profile;