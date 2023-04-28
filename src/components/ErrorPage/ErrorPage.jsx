import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to='/profile'>Profile</Link>
      <Link to='/message'>Message</Link>
      <Link to='/news'>News</Link>
      <Link to='/music'>Music</Link>
      <Link to='/setting'>Settings</Link>
    </div>
  )
}