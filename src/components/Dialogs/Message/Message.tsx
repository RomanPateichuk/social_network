import styles from '../Dialog.module.css'

type PropsType = {
  message: string
}

const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.message}>
      {props.message}
    </div>
  );
}



export default Message