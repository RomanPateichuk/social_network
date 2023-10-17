import React from 'react'
import s from './Users.module.css'
import userPhoto from '../../assets/images/userPhoto.png'
import { NavLink } from 'react-router-dom'

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }


  return <div className={s.wrapper}>
    <div>
      {
        pages.map(item => <span key={item} onClick={(e) => { props.onPageChanged(item) }} className={props.currentPage === item ? s.selectedPage : null}>{item}</span>)

      }
    </div>
    {
      props.users.map((item) => <div key={item.id}>
        <span>
          <div>
            <span>{item.id}</span>
            <NavLink to={'/profile/' + item.id}>
              <img className={s.userPhoto} src={item.photos.large != null ? item.photos.large : userPhoto} alt={item.name} />
            </NavLink>
          </div>
          <div>
            {item.followed
              ? <button onClick={() => { props.unfollow(item.id) }}>Unfollow</button>
              : <button onClick={() => { props.follow(item.id) }}>Follow</button>
            }
          </div>
        </span>
        <span>
          <span>
            <div>{item.name}</div>
            <div>{item.status}</div>
          </span>
          <span>
            <div>{'item.location.country'}</div>
            <div>{'item.location.city'}</div>
          </span>
        </span>
      </div>)
    }</div>
}



export default Users


