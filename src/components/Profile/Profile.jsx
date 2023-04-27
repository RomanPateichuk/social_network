import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWYenGebfzJCuwiR4WdjzTzI7BdavwbbeHA&usqp=CAU" alt="content" />
      </div>
      <div>
        ava+descr
      </div>
      <MyPosts />
    </div>
  );
}


export default Profile;