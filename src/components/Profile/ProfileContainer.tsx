import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { UrlIdParams, withRouter } from '../common/withRouter/withRouter'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../redux/store'
import { ProfileType } from '../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (text: string) => void
  savePhoto: (file: File) => void
  saveProfile: <T>(profile: ProfileType) => Promise<T>
}


type withRouterPropsType = {
  params: UrlIdParams
}

type PropsType = MapPropsType & DispatchPropsType & withRouterPropsType

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId
    }

    this.props.getUserProfile(userId as number)
    this.props.getStatus(userId as number)

  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
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

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)