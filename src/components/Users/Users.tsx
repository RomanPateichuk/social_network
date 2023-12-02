import React, {useEffect} from 'react'
import s from './Users.module.css'
import User from "./User"
import {useSelector} from 'react-redux'
import Paginator from '../common/Paginator/Paginator'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, requestUsers, follow, unfollow} from '../../redux/users-reducer'
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
  getFollowingInProgress
} from '../../redux/users-selectors'
import {useDispatch} from 'react-redux'
import {useLocation, useNavigate} from "react-router-dom"
import queryString from 'query-string';

type QueryParamsType = { term?: string, page?: string, friend?: string };
let Users: React.FC = () => {
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {

    const {search} = location
    const parsed = queryString.parse(search) as QueryParamsType
    let actualPage = currentPage
    let actualFilter = filter
    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null}
        break
      case 'true':
        actualFilter = {...actualFilter, friend: true}
        break
      case 'false':
        actualFilter = {...actualFilter, friend: false}
    }


    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {

    const query: QueryParamsType = {}
    if (!!filter.term) query.term = filter.term
    if (!!filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)
    navigate({
      pathname: '/users',
      search: queryString.stringify(query)
    });
  }, [filter, currentPage]);
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
               pageSize={pageSize}/>
    <div>
      <div><UsersSearchForm onFilterChanged={onFilterChanged}/></div>
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


