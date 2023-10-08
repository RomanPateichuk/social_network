import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import React from 'react'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/state';




const Dialogs = (props) => {

  let state = props.store.getState().dialogsPage

  let dialogElementsJSX = state.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = state.messages.map(item => <Message key={item.id} message={item.message} />)
  let newMessageBody = state.newMessageBody
  let message = React.createRef()

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (e) => {
    let body = e.target.value
    props.store.dispatch(updateNewMessageBodyCreator(body))
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