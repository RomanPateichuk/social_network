import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import { CreateField, Textarea } from '../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { InitialStateType } from '../../redux/dialogs-reducer';

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      {CreateField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
}

const AddMessageFromRedux = reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(AddMessageForm)

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let dialogElementsJSX = props.dialogsPage.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = props.dialogsPage.messages.map(item => <Message key={item.id} message={item.message} />)
  let addNewMesage = (data: NewMessageFormValuesType) => {
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

// types
type PropsType = {}

type OwnPropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
  isAuth: boolean
}
export type NewMessageFormValuesType = {
  newMessageBody: string
}

type NewMessageFormValuesKeysType = keyof NewMessageFormValuesType