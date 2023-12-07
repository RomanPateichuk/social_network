import React from "react";
import logo from '../../logo.svg';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {logout} from "../../redux/auth-reducer";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Layout, theme} from "antd";
import {getCurrentUserPhoto} from "../../redux/profile-selector";
export type PropsType = {}
const {Header} = Layout;

export const HeaderComponent: React.FC<PropsType> = (props) => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)
  const profilePhoto = useSelector(getCurrentUserPhoto)
  const dispatch = useDispatch<any>()

  return (
    <Header style={{background: colorBgContainer}} className={s.header}>
      <NavLink className={s.imageContainer} to={"/"}><img className={s.logo} src={logo} alt="logo"/></NavLink>
      {isAuth
        ? <div className={s.loginContainer}>
          <Avatar size={'default'} src={profilePhoto}></Avatar>
          <p className={s.login}>{login}</p>
          <Button onClick={() => {
            dispatch(logout())
          }}>Log out</Button>
        </div>
        : <NavLink to={'/login'}><Button>Login</Button></NavLink>
      }
    </Header>
  );
}
