import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile } from '../../redux/profile-reducer'
import { withRouter } from '../common/withRouter/withRouter'
import { Navigate } from 'react-router-dom'
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.userId;
    if (!userId) {
      userId = 2
    }
    this.props.getUserProfile(userId)
  }


  render() {
    if (!this.props.isAuth) {
      return <Navigate to={'/login'} />
    }
    return <Profile {...this.props} profile={this.props.profile} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer))