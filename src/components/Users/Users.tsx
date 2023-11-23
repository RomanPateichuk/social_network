import React, { useEffect } from 'react'
import s from './Users.module.css'
import User from "./User"
import { useSelector } from 'react-redux'
import Paginator from '../common/Paginator/Paginator'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer'
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers, getUsersFilter, getFollowingInProgress } from '../../redux/users-selectors'
import { useDispatch } from 'react-redux'


let Users: React.FC = () => {
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [dispatch, currentPage, pageSize, filter])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }

  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return <div className={s.wrapper}>
    <Paginator currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalUsersCount={totalUsersCount}
      pageSize={pageSize} />
    <div>
      <div><UsersSearchForm onFilterChanged={onFilterChanged} /></div>
      {
        users.map((item) => <User
          user={item}
          key={item.id}
          followingInProgress={followingInProgress}
          follow={onFollow}
          unfollow={onUnfollow}
        />)
      }
    </div>
  </div>
}

export default Users


