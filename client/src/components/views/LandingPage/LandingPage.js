import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd'
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

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

    const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: 4,
            filters: filters
        }

        getProduct(body)
        setSkip(0)
    }
    
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters

        showFilterResults()
    }
    
    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let'x Travel AnyWhere
                    <RocketOutlined />
                </h2>
            </div>

            {/* Filter */}

            {/* CheckBox */}
            <CheckBox
                list={continents}
                handleFilters={filter => handleFilters(filters, "continents")} />

            {/* RadioBox */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>

            {PostSize >= Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage
