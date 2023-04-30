import styles from '../Dialog.module.css'

const Message = (props) => {
  return (
    <div className={styles.message}>
      {props.message}
    </div>
  );
}



export default Message