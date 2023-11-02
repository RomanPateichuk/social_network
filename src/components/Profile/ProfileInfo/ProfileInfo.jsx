import { React, useState } from "react"
import Preloader from '../../common/Preloader/Preloader';
import a from './ProfileInfo.module.css'
import userDefaultPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from "./ProfileDataForm"


const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)


  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })


  }

  return (
    <div>
      <div className={a.descriptionBlock}>
        <img src={profile.photos.large || userDefaultPhoto} alt="" />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode
          ? <ProfileDataForm
            initialValues={
              {
                "FullName": profile.fullName,
                "lookingForAJob": profile.lookingForAJob,
                "LookingForAJobDescription": profile.lookingForAJobDescription,
                "AboutMe": profile.aboutMe,
                "contacts": {
                  ...profile.contacts
                }
              }}
            onSubmit={onSubmit}
            profile={profile} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}
        <ProfileData profile={profile} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div>
  );
}


const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

    <div>
      <b>Full name: </b> {profile.fullName}
    </div>
    <div>
      <b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
    </div>
    {
      profile.lookingForAJob &&
      <div>
        <b>My professioanal skills: </b> {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me: </b> {profile.aboutMe}
    </div>
    <div>
      <b>Contacts: </b> {
        Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        )
      }
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div><b>{contactTitle}:</b>{contactValue}</div>

}

export default ProfileInfo;