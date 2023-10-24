import s from './MyPosts.module.css'
import MyPost from './Post/MyPost';
import React from "react"
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10)


const AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]} placeholder={'Post message'}></Field>
    </div>
    <div>
      <button>Add post</button>
    </div>
  </form>
}

const AddNewPostFormRedux = reduxForm({ form: "postAddForm" })(AddNewPostForm)


const MyPosts = (props) => {
  let postsDataJSX = props.posts.map(item => <MyPost key={item.id} message={item.message} likesCount={item.likesCount} />)

  let onAddPost = (data) => {
    props.addPost(data.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsDataJSX}
      </div>
    </div>
  );
}


export default MyPosts;