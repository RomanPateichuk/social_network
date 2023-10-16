import Preloader from '../../common/Preloader/Preloader';
import a from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={a.image_wrapper}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWYenGebfzJCuwiR4WdjzTzI7BdavwbbeHA&usqp=CAU" alt="content" />
      </div>
      <div className={a.descriptionBlock}>
        <img src={props.profile.photos.large} alt="" />
        ava+descr
      </div>
    </div>
  );
}


export default ProfileInfo;