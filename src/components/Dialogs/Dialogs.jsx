import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import React from 'react'
import { Navigate } from 'react-router-dom'




const Dialogs = (props) => {
  let dialogElementsJSX = props.dialogsPage.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = props.dialogsPage.messages.map(item => <Message key={item.id} message={item.message} />)
  let newMessageBody = props.dialogsPage.newMessageBody
  let message = React.createRef()

  let onSendMessageClick = () => {
    props.onSendMessageClick()
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.onNewMessageChange(body)
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
        <div>
          <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder='Enter your message' ref={message}></textarea></div>
          <div><button onClick={onSendMessageClick}>Send</button></div>
        </div>


      </div>

    </div>
  );
}

export default Dialogs