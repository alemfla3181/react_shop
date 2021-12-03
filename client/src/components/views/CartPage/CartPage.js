import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'


function CartPage(props) {
    const dispatch = useDispatch()

    useEffect(() => {

        let cartItems = []
        // User state cart안에 상품이 있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
        console.log(cartItems)
    }, [props.user.userData])

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}/>
        </div>
    )
}

export default CartPage