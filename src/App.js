import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Dialogs from './components/Dialogs/Dialogs'
import Profile from './components/Profile/Profile'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App(props) {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/profile" />} />
            <Route path='/profile' element={<Profile postsData={props.state.profilePage} dispatch={props.dispatch} />} />
            <Route path='/dialogs' element={<Dialogs dialogsData={props.state.dialogsPage} />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

