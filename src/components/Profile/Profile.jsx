import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.postsData.posts} />
    </div >
  );
}


export default Profile;