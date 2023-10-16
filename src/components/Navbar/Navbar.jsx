import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const toggleActiveClass = ({ isActive }) => {
  return isActive ? classes.active : undefined
};


const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' className={toggleActiveClass}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' className={toggleActiveClass}>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' className={toggleActiveClass}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/news' className={toggleActiveClass}>News</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/music' className={toggleActiveClass}>Music</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/settings' className={toggleActiveClass}>Settings</NavLink>
      </div>

    </nav>
  );
}


export default Navbar;