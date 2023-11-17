import React, { useEffect } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { CreateField, Input } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { useNavigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/store'

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return <form onSubmit={handleSubmit}>
    <>
      {CreateField<LoginFormvaluesTypeKeys>("Email", "email", [required], Input)}
      {CreateField<LoginFormvaluesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
      {CreateField<LoginFormvaluesTypeKeys>(null, "rememberMe", [required], Input, { type: "checkbox" }, "remember me")}

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && CreateField("Symbols from image", "captcha", [required], Input, {})}

      {error && <div className={s.form_summary_error}>
        {error}
      </div>
      }
    </>
    <div>
      <button>Login</button>
    </div>
  </form>
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type MapStatePropsType = {
  isAuth: boolean,
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormvaluesTypeKeys = keyof LoginFormValuesType

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const navigate = useNavigate();
  let onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl

})

export default connect(mapStateToProps, { login })(Login)