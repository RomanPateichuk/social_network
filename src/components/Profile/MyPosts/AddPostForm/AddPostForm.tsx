import { InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../../../utils/validators/validators"
import { CreateField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormsControls"

type PropsType = {}

export type AddPostFormValuesType = {
  newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return <>
    <form onSubmit={props.handleSubmit}>
      {CreateField<AddPostFormValuesTypeKeys>('Your post', 'newPostText', [required], Textarea)}
      <div>
        <button>Add post</button>
      </div>
    </form>
  </>
}

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType>({ form: "postAddForm" })(AddNewPostForm)

export default AddNewPostFormRedux