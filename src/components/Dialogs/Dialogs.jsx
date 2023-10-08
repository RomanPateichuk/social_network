import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import React from 'react'




const Dialogs = (props) => {
  let dialogElementsJSX = props.dialogsData.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = props.dialogsData.messages.map(item => <Message key={item.id} message={item.message} />)

  let message = React.createRef()

  let sendMessage = () => {
    let data = message.current.value
    console.log('data: ', props.dialogsData.messages);
    console.log(data);
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogElementsJSX}
      </div>
      <div className={styles.messages}>
        {messagesDataJSX}
        <textarea ref={message}></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default Dialogs