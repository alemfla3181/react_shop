import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="home">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="popular">
                <Link to="/popular">Popular</Link>
            </Menu.Item>
            <Menu.Item key="view">
                <Link to="/view">Views</Link>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu