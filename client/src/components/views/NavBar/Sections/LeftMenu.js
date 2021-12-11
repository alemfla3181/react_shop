import React from 'react';
import LandingPage from '../../LandingPage/LandingPage';

import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="home">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="popular">
                <a href="/popular">Popular</a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu