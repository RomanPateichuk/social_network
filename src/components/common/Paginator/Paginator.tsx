import React, { useState } from 'react'
import s from './Paginator.module.css'
import cn from "classnames"

type PropsType = {
  portionSize?: number
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void

}

let Paginator: React.FC<PropsType> = ({ portionSize = 20, totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPorionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize
  // 
  return <div>
    {portionNumber > 1 &&
      <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
    {
      pages.filter(item => item >= leftPorionPageNumber && item <= rightPortionPageNumber)
        .map(item => <span key={item} onClick={(e) => { onPageChanged(item) }}
          className={cn(s.pageNumber, { [s.selectedPage]: currentPage === item })}>{item}
        </span>)

    }
    {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
  </div >

}


export default Paginator


