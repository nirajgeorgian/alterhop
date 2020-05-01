import React, {useState} from 'react'
import {Menu} from 'antd'
import { UserOutlined, MessageOutlined, VideoCameraOutlined, BookOutlined, AppstoreOutlined } from '@ant-design/icons'


interface IProfileMenuListProps{
   
}

interface IProfileMenuItem{
  key:string;
  icon:React.FC
}

const ProfileMenuList: React.FC<IProfileMenuListProps> = ({}) => {
    const [ key, setKey] = useState<string>('1')


    return (
      <div>
        <Menu
          defaultSelectedKeys={[key]}
          mode="inline"
          theme="dark"
          onClick={e => setKey(e.key)}
          selectable
          style={{display: "flex", flexDirection: "column"}}
        >
          <Menu.Item key="1" icon={<UserOutlined style={{fontSize:"20px"}}/>}>
            <span style={{fontSize:"20px"}}>My Profile</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined style={{fontSize:"20px"}}/>}>
            <span style={{fontSize:"20px"}}>Jobs</span>
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined style={{fontSize:"20px"}}/>}>
            <span style={{fontSize:"20px"}}>Saved Jobs</span>
          </Menu.Item>
          <Menu.Item key="4" icon={<MessageOutlined style={{fontSize:"20px"}}/>}>
            <span style={{fontSize:"20px"}}>Messages</span>
          </Menu.Item>
          <Menu.Item key="5" icon={<VideoCameraOutlined style={{fontSize:"20px"}}/>}>
            <span style={{fontSize:"20px"}}>Interviews</span>
          </Menu.Item>
        </Menu>
      </div>
    )
}

export default ProfileMenuList