/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {ShoppingCartOutlined} from '@ant-design/icons'

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <Link to="/login">Signin</Link>
                </Menu.Item>
                <Menu.Item key="app">
                    <Link to="/register">Signup</Link>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <Link to="/product/upload">Upload</Link>
                </Menu.Item>
                <Menu.Item key="history">
                    <Link to="/history">History</Link>
                </Menu.Item>
                <Menu.Item key="cart" >
                    <Badge count={user.userData && user.userData.cart.length}
                        style={{ paddingBottom: 1, marginRight: 10 }}>
                        <Link to="/user/cart">
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: 35,
                                    marginRight: 0,
                                    color: 'GreenYellow'
                                }} />
                        </Link>
                    </Badge>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);

