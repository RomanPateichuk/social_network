import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const toogleActiveClass = ({ isActive }: { isActive: boolean }): string => {
  return isActive ? s.active : ''
}



const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/profile' className={toogleActiveClass}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs' className={toogleActiveClass}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users' className={toogleActiveClass}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news' className={toogleActiveClass}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/music' className={toogleActiveClass}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/settings' className={toogleActiveClass}>Settings</NavLink>
      </div>
    </nav>
  );
}


export default Navbar;