import logo from '../../logo.svg';
import s from './Header.module.css'

const Header = () => {
  return (
    <header className={s.header}>
      <a href="/"><img src={logo} alt="logo" /></a>
    </header>
  );
}


export default Header;