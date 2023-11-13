import { connect } from 'react-redux'
import { unfollow, follow, requestUsers } from '../../redux/users-reducer'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getFollowingInProgress, getIsFetching, getTotalUsersCount, getPageSize, getCurrentPage, getUsers } from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'


type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  currentPage: number
  totalUsersCount: number
  isFetching: boolean
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
  title: string
}

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const { currentPage, pageSize } = this.props
    this.props.requestUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props
    this.props.requestUsers(pageNumber, pageSize)
  }

  render() {
    return <>
      {this.props.title}
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}


let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),

  }
}


export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
  follow, unfollow, requestUsers,
}))(UsersContainer)


