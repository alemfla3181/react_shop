import React,{useState} from 'react'
import { Button, Descriptions,message } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions'
import moment from 'moment'

function ProductInfo(props) {
    const nowTime = moment().format("YYYYMMDD HH:mm:ss")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [Waiting, setWaiting] = useState(true)

    const clickHandler = () => {
        if (user.userData && !user.userData.isAuth) {
            return message.warning("먼저 로그인하세요");
            alert("먼저 로그인하세요")
        } else {  // 필요한 정보를 장바구니에 넣어준다
            if (Waiting) {
                console.log(nowTime)
                dispatch(addToCart(props.detail._id))
                setWaiting(false)
                setTimeout(() =>  {setWaiting(true)}, 300)
            } else {
                return alert("loading...")
            }
        }
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.view}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size='large' shape='round' type='danger' onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
