import { React, useEffect } from 'react'
import { reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { CreateField, Input } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { useNavigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return <form onSubmit={handleSubmit}>
    {CreateField("Email", "email", [required], Input)}
    {CreateField("Password", "password", [required], Input, { type: "password" })}
    {CreateField(null, "rememberMe", [required], Input, { type: "checkbox" }, "remember me")}

    {captchaUrl && <img src={captchaUrl} alt="" />}
    {captchaUrl && CreateField("Symbols from image", "captcha", [required], Input, {})}

    {error && <div className={s.form_summary_error}>
      {error}
    </div>
    }
    <div>
      <button>Login</button>
    </div>
  </form>
}


const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)


const Login = (props) => {
  const navigate = useNavigate();
  let onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }



  useEffect(() => {
    if (props.isAuth) {
      navigate("/profile");
    }
  }, [props.isAuth, navigate]);

  return <div><h1>Login</h1><LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
  </div>



}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl

})

export default connect(mapStateToProps, { login })(Login)