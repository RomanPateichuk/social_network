import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  profile: ProfileType | null
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: <T>(profile: ProfileType) => Promise<T>
  status: string
  isOwner: boolean
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div >
  );
}


export default Profile;