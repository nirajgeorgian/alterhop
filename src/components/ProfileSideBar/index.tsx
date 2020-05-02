import React from 'react'
import AvatarCard from './AvatarCard'
import ProfileMenuList from './ProfileMenuList'

interface IProfileMenuProps {
	value: any
}

const ProfileSideBar: React.FC<IProfileMenuProps> = () => (
	<div>
		<AvatarCard />
		<ProfileMenuList />
	</div>
)

export default ProfileSideBar
