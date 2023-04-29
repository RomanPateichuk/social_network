import a from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (
    <div>
      <div className={a.image_wrapper}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWYenGebfzJCuwiR4WdjzTzI7BdavwbbeHA&usqp=CAU" alt="content" />
      </div>
      <div className={a.descriptionBlock}>
        ava+descr
      </div>
    </div>
  );
}


export default ProfileInfo;