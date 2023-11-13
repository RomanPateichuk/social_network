import React from 'react'
import s from './Users.module.css'
import User from "./User"
import Paginator from '../common/Paginator/Paginator'
import { UserType } from '../../types/types'

type PropsType = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  users: Array<UserType>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
  followingInProgress: Array<number>
}


let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
  return <div className={s.wrapper}>
    <Paginator currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalUsersCount={totalUsersCount}
      pageSize={pageSize} />

    <div>
      {
        users.map((item) => <User
          user={item}
          key={item.id}
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unfollow={props.unfollow}
        />)
      }
    </div>
  </div>
}

export default Users


