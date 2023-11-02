import React from "react"
import { CreateField, Input, Textarea } from "../../common/FormsControls/FormsControls"
import { reduxForm } from "redux-form"
import s from "../../common/FormsControls/FormsControls.module.css"

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return <form onSubmit={handleSubmit} >
    {
      error && <div className={s.form_summary_error} >
        {error}
      </div>
    }
    <div><button>save</button></div>
    <div>
      <b>Full name: </b> {CreateField("Full name", "FullName", [], Input)}
    </div>
    <div>
      <b>Looking for a job: </b>{CreateField("", "lookingForAJob", [], Input, { type: "checkbox" })}
    </div>
    <div>
      <b>My professioanal skills: </b> {CreateField("My professionak skills", "LookingForAJobDescription", [], Textarea)}
    </div>

    <div>
      <b>About me: </b> {CreateField("About me", "AboutMe", [], Textarea)}
    </div>
    <div>
      <b>Contacts: </b> {
        Object.keys(profile.contacts)
          .map(key => {
            return <div key={key}>
              <b>{key}: {CreateField(key, "contacts." + key, [], Input)}</b>
            </div>
          }
          )
      }
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)

export default ProfileDataFormReduxForm