import Loading from 'components/loading';
import React from 'react'
import { useAuth } from 'app/contexts/auth';
import { withRouter } from 'react-router-dom';

const ProfileBase: React.FC = () => {
  const { user, isLoading } = useAuth()

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