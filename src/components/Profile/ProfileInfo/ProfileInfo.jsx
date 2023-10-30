import Preloader from '../../common/Preloader/Preloader';
import a from './ProfileInfo.module.css'
import userDefaultPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={a.descriptionBlock}>
        <img src={profile.photos.large ? profile.photos.large : userDefaultPhoto} alt="" />
        <p>id: {profile.userId}</p>
        <p>{profile.fullName}</p>
        <p>About me: {profile.aboutMe ? profile.fullName : <span>no info</span>}</p>
        {

          Object.keys(profile.contacts).map(element => {
            return <div key={element}>
              <span >{profile.contacts[element] ? element + ':  ' + profile.contacts[element] : <span>{element}: no info</span>}</span>
            </div>
          })
        }
      </div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
    </div>
  );
}


export default ProfileInfo;