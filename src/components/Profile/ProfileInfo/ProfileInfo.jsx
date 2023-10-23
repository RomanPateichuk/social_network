import Preloader from '../../common/Preloader/Preloader';
import a from './ProfileInfo.module.css'
import userDefaultPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatus from './ProfileStatus'
const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={a.descriptionBlock}>
        <img src={props.profile.photos.large ? props.profile.photos.large : userDefaultPhoto} alt="" />
        <p>id: {props.profile.userId}</p>
        <p>{props.profile.fullName}</p>
        <p>About me: {props.profile.aboutMe ? props.profile.fullName : <span>no info</span>}</p>
        {

          Object.keys(props.profile.contacts).map(element => {
            return <div key={element}>
              <span >{props.profile.contacts[element] ? element + ':  ' + props.profile.contacts[element] : <span>{element}: no info</span>}</span>
            </div>
          })
        }
      </div>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
    </div>
  );
}


export default ProfileInfo;