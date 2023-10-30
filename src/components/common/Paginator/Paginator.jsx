import React from 'react'
import s from './Paginator.module.css'

let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }


  return <div>
    {
      pages.map(item => <span key={item} onClick={(e) => { onPageChanged(item) }}
        className={currentPage === item ? s.selectedPage : null}>{item}
      </span>)

    }
  </div>

}


export default Paginator


