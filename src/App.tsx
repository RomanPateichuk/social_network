import './App.css';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { UsersPage } from './components/Users/UsersPage'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login'
import React from 'react';
import { connect, Provider } from 'react-redux'
import { initializedApp } from './redux/app-reducer'
import store, { AppStateType } from './redux/store'
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component<PropsType> {

  componentDidMount() {
    this.props.initializedApp()
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper" >
        <HeaderContainer />
        < Navbar />
        <div className="app-wrapper-content" >
          <Routes>
            <Route path='/' element={< Navigate to="/profile" />} />
            < Route path='/profile/:userId?' element={< React.Suspense fallback={<div> Loading...</div>}><ProfileContainer /> </React.Suspense>} />
            <Route path='/dialogs' element={< React.Suspense fallback={<div> Loading...</div>}><DialogsContainer /> </React.Suspense>} />
            <Route path='/news' element={< News />} />
            < Route path='/music' element={< Music />} />
            < Route path='/settings' element={< Settings />} />
            < Route path='/users' element={< UsersPage title="Привет самурай" />} />
            < Route path='/login' element={< LoginPage />} />
            < Route path='*' element={< ErrorPage />} />
          </Routes>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, { initializedApp })(App);

export const SamuraiJSApp = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


// types
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  initializedApp: () => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType








