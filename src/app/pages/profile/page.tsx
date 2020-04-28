import Loading from 'components/loading';
import React from 'react'
import { withRouter } from 'react-router-dom';

const ProfileBase: React.FC = () => {
  const { user, isLoading } = {
    user: { picture: "http://dummy.duck", email: "dodo@duck", name: "dummy user" },
    isLoading: false
  }

  return (
    <Loading loading={isLoading || !user}>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Loading>
  )
}

export const Profile = withRouter(ProfileBase)
export default Profile