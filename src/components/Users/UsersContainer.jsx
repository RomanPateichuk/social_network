import { connect } from 'react-redux'
import { unfollowAC, followAC, setUsersAC, setCurrentPageAC, setUsersTotalUsersCountAC } from '../../redux/users-reducer'
import axios from 'axios'
import React from 'react'
import Users from './Users'

class UsersAPIComponent extends React.Component {

  componentDidMount() {

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
        // this.props.setTotalUsersCount(response.data.totalCount)
        this.props.setTotalUsersCount(100)

      })
  }

  onPageChanged = (item) => {
    this.props.setCurrentPage(item)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${item}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items)
      })

  }

  render() {
    return <Users
      totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      onPageChanged={this.onPageChanged}
      users={this.props.users}
      follow={this.props.follow}
      unfollow={this.props.unfollow}

    />
  }
}


let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
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
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setUsersTotalUsersCountAC(totalCount))
    }
  }
}


export default connect(mapStateToProps, mapDispachToProps)(UsersAPIComponent)


