import './App.css';
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {UsersPage} from './components/Users/UsersPage'
import {Route, Routes, BrowserRouter, Navigate, NavLink} from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import {LoginPage} from './components/Login/Login'
import React, {useEffect, useState} from 'react';
import {connect, Provider, useDispatch} from 'react-redux'
import {initializedApp} from './redux/app-reducer'
import store, {AppStateType} from './redux/store'
import Preloader from './components/common/Preloader/Preloader';
import { ProfileOutlined, UserSwitchOutlined, MessageOutlined, SettingOutlined, PlayCircleOutlined, CompassOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {HeaderComponent as Header} from "./components/Header/Header";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const { Content, Footer, Sider } = Layout;

type PropsType = {}

const App: React.FC<PropsType> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch<any>()
  const initialized = ((state: AppStateType)=> state.app.initialized)

  useEffect(() => {
    dispatch(initializedApp())
  }, []);

  return (
    <Layout>
      {!(!initialized || !<Preloader/>)}
        <Header/>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['profile']}
              >
              <Menu.Item key={'profile'} icon={<ProfileOutlined/>}>
                <NavLink to='/profile'>Profile</NavLink>
              </Menu.Item>
              <Menu.Item key={'users'} icon={<UserSwitchOutlined />}>
                <NavLink to='/users'>Users</NavLink>
              </Menu.Item>
              <Menu.Item key={'dialogs'} icon={<MessageOutlined />}>
                <NavLink to='/dialogs'>Dialogs</NavLink>
              </Menu.Item>
              <Menu.Item key={'music'} icon={<PlayCircleOutlined />}>
                <NavLink to='/music'>Music</NavLink>
              </Menu.Item>
              <Menu.Item key={'news'} icon={<CompassOutlined />}>
                <NavLink to='/news'>News</NavLink>
              </Menu.Item>
              <Menu.Item key={'settings'} icon={<SettingOutlined />}>
                <NavLink to='/settings'>Settings</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
                 <Routes>
                   <Route path='/' element={< Navigate to="/profile"/>}/>
                   <Route path='/profile/:userId?' element={< React.Suspense fallback={<div> Loading...</div>}><ProfileContainer/> </React.Suspense>}/>
                   <Route path='/dialogs' element={< React.Suspense fallback={<div> Loading...</div>}><DialogsContainer/> </React.Suspense>}/>
                   <Route path='/news' element={< News/>}/>
                   <Route path='/music' element={< Music/>}/>
                   <Route path='/settings' element={< Settings/>}/>
                   <Route path='/users' element={< UsersPage title="Привет самурай"/>}/>
                   <Route path='/login' element={< LoginPage/>}/>
                   <Route path='*' element={< ErrorPage/>}/>
                 </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>

  );
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, {initializedApp})(App);

export const SamuraiJSApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

















