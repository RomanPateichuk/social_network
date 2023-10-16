import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import UsersContainer from './components/Users/UsersContainer'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ErrorPage from './components/ErrorPage/ErrorPage';
import ProfileContainer from './components/Profile/ProfileContainer';
import Profile from './components/Profile/Profile'

function App(props) {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/profile" />} />
            <Route path='/profile/30183' element={<ProfileContainer />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<UsersContainer />} />
            {/* <Route path='*' element={<ErrorPage />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

