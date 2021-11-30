import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd'
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProduct(body)
        
    }, [])

    const getProduct = (body) => {
        Axios.post("/api/product/products", body).then((response) => {
            if (response.data.success) {
                //console.log(response.data)
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo]);
                } else {
                    setProducts(response.data.productInfo);   
                }
                setPostSize(response.data.postSize)
            } else {
                alert("상품들을 가져오는데 실패했습니다.");
            }
        });
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProduct(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {

        console.log('product', product)

        return (
            <Col lg={12} md={10} xs={24} key={index}>
                <Card
                    cover={<ImageSlider images={product.images} /> }
                >
                    <Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Col>
        );
    })
    
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>
                    Let'x Travel AnyWhere
                    <RocketOutlined />
                </h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16,16]}>
                {renderCards}
            </Row>

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
        </div>
    );
}

export default LandingPage
