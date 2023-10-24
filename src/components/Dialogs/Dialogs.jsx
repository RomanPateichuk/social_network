import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { Textarea } from '../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'


const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={Textarea}
        validate={[required, maxLength50]}
        name="newMessageBody"
        placeholder='Enter your message'></Field>
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
}

const AddMessageFromRedux = reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm)



const Dialogs = (props) => {
  let dialogElementsJSX = props.dialogsPage.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = props.dialogsPage.messages.map(item => <Message key={item.id} message={item.message} />)
  let addNewMesage = (data) => {
    props.sendMessage(data.newMessageBody)
  }

  if (!props.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogElementsJSX}
      </div>
      <div className={styles.messages}>
        <div>{messagesDataJSX}</div>
        <AddMessageFromRedux onSubmit={addNewMesage} />


      </div>

    </div>
  );
}

export default Dialogs