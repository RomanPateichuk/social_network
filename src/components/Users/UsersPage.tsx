import { connect, useSelector } from 'react-redux'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { AppStateType } from '../../redux/store'


type PropsType = {
  title: string
}

export const UsersPage: React.FC<PropsType> = (props) => {
  const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)
  return <>
    {props.title}
    {isFetching ? <Preloader /> : null}
    <Users />
  </>
}






