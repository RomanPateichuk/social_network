import './App.css';
import Navbar from './components/Navbar/Navbar'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login'
import React from 'react';
import { connect } from 'react-redux'
import { initializedApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {

  componentDidMount() {
    this.props.initializedApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/profile/:userId?' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializedApp })(App);

