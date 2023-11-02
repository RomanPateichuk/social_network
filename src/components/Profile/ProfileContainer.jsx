import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { withRouter } from '../common/withRouter/withRouter'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.params.userId !== prevProps.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <Profile {...this.props}
      profile={this.props.profile}
      status={this.props.status}
      updateStatus={this.props.updateStatus}
      isOwner={!this.props.params.userId}
      savePhoto={this.props.savePhoto}
      saveProfile={this.props.saveProfile}
    />

  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})


export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)