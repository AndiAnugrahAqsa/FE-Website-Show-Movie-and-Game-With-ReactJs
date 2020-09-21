import React, { useContext } from "react"
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header } = Layout;

const Nav = () => {

    const [user, setUser] = useContext(UserContext)

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
        window.location = "/"
    }

    return (
        <div>
            <Layout>
                <Header className="header">

                    <Menu style={{ textAlign: "right" }} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item><div className="logo" /></Menu.Item>
                        <Menu.Item style={{ float: "left" }} ><Link to="/">Home</Link></Menu.Item>
                        {user && <Menu.Item style={{ float: "left" }} ><Link to="/movies">Movies</Link></Menu.Item>}
                        {user && <Menu.Item style={{ float: "left" }} ><Link to="/games">Games</Link></Menu.Item>}
                        {user === null && <Menu.Item ><Link to="/register">Register</Link></Menu.Item>}
                        {user === null && < Menu.Item > <Link to="/login">Login</Link></Menu.Item>}
                        {user && <strong style={{ marginRight: 10 }}>{user.name}</strong>}
                        {user && <SubMenu icon={<SettingOutlined />} title="Setting">
                            <Menu.Item><Link to="/changepassword">Change Password</Link></Menu.Item>
                            <Menu.Item><Link onClick={handleLogout}>Logout</Link></Menu.Item>
                        </SubMenu>}
                    </Menu>
                </Header>
            </Layout>
        </div >
    )

}


export default Nav