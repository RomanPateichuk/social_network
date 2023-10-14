import React from 'react'
import s from './Users.module.css'

let Users = (props) => {

  if (props.users.length === 0) {
    props.setUsers(
      [
        { id: "1", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name1", status: "status1", location: { city: "city1", country: 'country1' } },
        { id: "2", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name2", status: "status2", location: { city: "city2", country: 'country2' } },
        { id: "3", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name3", status: "status3", location: { city: "city3", country: 'country3' } },
        { id: "4", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name4", status: "status4", location: { city: "city4", country: 'country4' } },
        { id: "5", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: true, fullName: "name5", status: "status5", location: { city: "city5", country: 'country5' } },
        { id: "6", photoUrl: 'https://audiostories.ru/images/artists/luntik-i-ego-druzya.jpg', followed: false, fullName: "name6", status: "status6", location: { city: "city6", country: 'country6' } },
      ]
    )
  }


  return <div className={s.wrapper}>
    {
      props.users.map((item) => <div key={item.id}>
        <span>
          <div>
            <img className={s.userPhoto} src={item.photoUrl} alt={item.fullName} />
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
            <div>{item.fullName}</div>
            <div>{item.status}</div>
          </span>
          <span>
            <div>{item.location.country}</div>
            <div>{item.location.city}</div>
          </span>
        </span>
      </div>)
    }</div>
}


export default Users


