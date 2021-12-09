/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
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
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>
                <Menu.Item key="history">
                    <a href="/history">History</a>
                </Menu.Item>
                <Menu.Item key="cart" >
                    <Badge count={user.userData && user.userData.cart.length}
                        style={{ paddingBottom: 1, marginRight: 10 }}>
                        <a href="/user/cart">
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: 35,
                                    marginRight: 0,
                                    color: 'GreenYellow'
                                }} />
                        </a>
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

