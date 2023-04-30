import styles from './Dialog.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'

const Dialogs = (props) => {
  let dialogElementsJSX = props.dialogsData.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
  let messagesDataJSX = props.dialogsData.messages.map(item => <Message key={item.id} message={item.message} />)
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogElementsJSX}
      </div>
      <div className={styles.messages}>
        {messagesDataJSX}
      </div>
    </div>
  );
}

export default Dialogs