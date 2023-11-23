import React, { useEffect } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { CreateField, GetStringKeys, Input } from '../common/FormsControls/FormsControls'
import { login } from '../../redux/auth-reducer'
import { useNavigate } from "react-router-dom";
import s from '../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'

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

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  let onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/profile")
    }
  }, [isAuth, navigate])

  return <div><h1>Login</h1><LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
  </div>
}

type LoginFormOwnProps = {
  captchaUrl: string | null
}

type LoginFormvaluesTypeKeys = GetStringKeys<LoginFormValuesType>

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

