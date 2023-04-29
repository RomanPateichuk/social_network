import styles from './Dialog.module.css'
import { NavLink } from 'react-router-dom';


const DialogItem = (props) => {
  let path = "/dialogs/" + props.id
  return (
    <div className={styles.dialog + ' ' + styles.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
}


const Message = (props) => {
  return (
    <div className={styles.message}>
      {props.message}
    </div>
  );
}


let dialogsData = [
  {
    id: 1,
    name: 'Roman'
  },
  {
    id: 2,
    name: 'Sveta'
  },
  {
    id: 3,
    name: 'Andrey'
  },
  {
    id: 4,
    name: 'Seny'
  },
  {
    id: 5,
    name: 'Sacha'
  }
]


let dialogElementsJSX = dialogsData.map(item => <DialogItem name={item.name} id={item.id} />)

let messagesData = [
  { id: "1", message: "Hi" },
  { id: "2", message: "Hello" },
  { id: "3", message: "How are you?" },
]

let messagesDataJSX = messagesData.map(item => <Message message={item.message} />)

const Dialogs = () => {
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