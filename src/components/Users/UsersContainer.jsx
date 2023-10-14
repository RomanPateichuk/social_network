import Users from './Users'
import { connect } from 'react-redux'
import { unfollowAC, followAC, setUsersAC } from '../../redux/users-reducer'

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users
  }
}

let mapDispachToProps = (dispatch) => {
  return {
    follow: (id) => {
      dispatch(followAC(id))
    },
    unfollow: (id) => {
      dispatch(unfollowAC(id))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    }
  }
}


export default connect(mapStateToProps, mapDispachToProps)(Users)


