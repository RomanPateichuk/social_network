import React, { ChangeEvent, useState } from "react"
import Preloader from '../../common/Preloader/Preloader';
import a from './ProfileInfo.module.css'
import userDefaultPhoto from '../../../assets/images/userPhoto.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from "./ProfileDataForm"
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => any
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)


  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    // remove then
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
                "fullName": profile.fullName,
                "aboutMe": profile.aboutMe,
                "lookingForAJob": profile.lookingForAJob,
                "lookingForAJobDescription": profile.lookingForAJobDescription,
                "contacts": {
                  ...profile.contacts
                }
              }}
            onSubmit={onSubmit}
            profile={profile} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div>
  );
}


type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void

}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

    <div>
      <b>Full name: </b> {profile.fullName}
    </div>
    <div>
      <b>About me: </b> {profile.aboutMe}
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
      <b>Contacts: </b> {
        Object
          .keys(profile.contacts)
          .map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
          )
      }
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return <div><b>{contactTitle}:</b>{contactValue}</div>

}

export default ProfileInfo;