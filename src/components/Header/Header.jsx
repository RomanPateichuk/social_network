import logo from '../../logo.svg';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={s.header}>
      <a href="/"><img src={logo} alt="logo" /></a>
      <div className={s.loginBlock}>
        {props.isAuth
          ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>
        }
      </div>
    </header>
  );
}


export default Header;