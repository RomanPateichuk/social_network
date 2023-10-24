import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs'
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux'
// const DialogsContainer = () => {
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from 'redux';
//   return (
//     <StoreContext.Consumer>{(store) => {
//       let onSendMessageClick = () => {
//         store.dispatch(sendMessageCreator())
//       }
//       let onNewMessageChange = (body) => {
//         store.dispatch(updateNewMessageBodyCreator(body))
//       }
//       return <Dialogs onSendMessageClick={onSendMessageClick} onNewMessageChange={onNewMessageChange} state={store.getState().dialogsPage} />
//     }}
//     </StoreContext.Consumer>
//   );
// }

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody))
    },
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)