import React from 'react'
import AvatarCard from './AvatarCard'
import ProfileMenuList from './ProfileMenuList'

interface IProfileMenuProps{
    value: any
}

const ProfileSideBar: React.FC<IProfileMenuProps> = () => {

    return (
        <div>
            <AvatarCard/>
            <ProfileMenuList/>
        </div>
    )
}

export default ProfileSideBar