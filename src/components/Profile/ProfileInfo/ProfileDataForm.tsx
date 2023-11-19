import React from "react"
import { CreateField, GetStringKeys, Input, Textarea } from "../../common/FormsControls/FormsControls"
import { InjectedFormProps, reduxForm } from "redux-form"
import s from "../../common/FormsControls/FormsControls.module.css"
import { ProfileType } from "../../../types/types"

type PropsType = {
  profile: ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ profile, handleSubmit, error }) => {
  return <form onSubmit={handleSubmit} >
    {
      error && <div className={s.form_summary_error} >
        {error}
      </div>
    }
    <div><button>save</button></div>
    <div>
      <b>Full name: </b> {CreateField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
    </div>
    <div>
      <b>About me: </b> {CreateField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
    </div>
    <div>
      <b>Looking for a job: </b>{CreateField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
    </div>
    <div>
      <b>My professioanal skills: </b> {CreateField<ProfileTypeKeys>("My professionak skills", "lookingForAJobDescription", [], Textarea)}
    </div>
    <div>
      <b>Contacts: </b> {
        Object.keys(profile.contacts)
          .map(key => {
            return <div key={key}>
              {/* todo */}
              <b>{key}: {CreateField(key, "contacts." + key, [], Input)}</b>
            </div>
          }
          )
      }
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormReduxForm