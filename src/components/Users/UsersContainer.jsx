import { connect } from 'react-redux'
import { unfollow, follow, setUsers, setCurrentPage, toggleFollowingProgress, getUsers } from '../../redux/users-reducer'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
class UsersAPIComponent extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}


let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,

  }
}

// let mapDispachToProps = (dispatch) => {
//   return {
//     follow: (id) => {
//       dispatch(followAC(id))
//     },
//     unfollow: (id) => {
//       dispatch(unfollowAC(id))
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber))
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setUsersTotalUsersCountAC(totalCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching))
//     }
//   }
// }







export default compose(
  connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage,
    toggleFollowingProgress, getUsers
  })
)(UsersAPIComponent)


