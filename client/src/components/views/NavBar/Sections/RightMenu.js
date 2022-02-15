/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge } from 'antd';
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
            <div mode={props.mode}>
                <li>
                    <Link to="/login">Signin</Link>
                </li>
                <li>
                    <Link to="/register">Signup</Link>
                </li>
            </div>
        )
    } else {
        return (
            <div mode={props.mode}>
                <li>
                    <Link to="/product/upload">Upload</Link>
                </li>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
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
                </li>
                <li>
                    <a onClick={logoutHandler}>Logout</a>
                </li>
            </div>
        )
    }
}

export default withRouter(RightMenu);

