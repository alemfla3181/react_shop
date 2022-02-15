import React from 'react';
import { Link } from 'react-router-dom';

function LeftMenu(props) {
    return (
        <div mode={props.mode}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/popular">Popular</Link>
            </li>
            <li>
                <Link to="/view">Views</Link>
            </li>
        </div>
    )
}

export default LeftMenu