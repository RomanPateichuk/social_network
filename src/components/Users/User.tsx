import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

let User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
  return (<div>
    <span>
      <div>
        <span>{user.id}</span>
        <NavLink to={'/profile/' + user.id}>
          <img className={s.userPhoto} src={user.photos.large != null ? user.photos.large : userPhoto} alt={user.name} />
        </NavLink>
      </div>
      <div>
        {/* followed & unfollow doen't working */}
        {user.followed
          ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            unfollow(user.id)
          }}>Unfollow</button>
          : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            follow(user.id)
          }}>Follow</button>
        }
      </div>
    </span>
    <span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
      <span>
        <div>{'user.location.country'}</div>
        <div>{'user.location.city'}</div>
      </span>
    </span>
  </div >)

}

export default User


