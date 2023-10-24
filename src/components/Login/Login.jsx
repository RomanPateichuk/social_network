import { React, useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { useNavigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
  const { handleSubmit } = props
  return <form onSubmit={handleSubmit}>
    <div>
      <Field placeholder={'Email'} name={"email"} component={Input} validate={[required]} />
    </div>
    <div>
      <Field placeholder={'Password'} name={"password"} type={'password'} component={Input} validate={[required]} />
    </div>
    <div>
      <Field type={'checkbox'} name={"rememberMe"} component={Input} validate={[required]} />
      remember me
    </div>
    {props.error && <div className={s.form_summary_error}>
      {props.error}
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
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  useEffect(() => {
    if (props.isAuth) {
      navigate("/profile");
    }
  }, [props.isAuth, navigate]);

  return <div><h1>Login</h1><LoginReduxForm onSubmit={onSubmit} /></div>



}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)