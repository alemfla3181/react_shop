import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { Col, Card, Row, Button } from 'antd'
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas';


const { Meta } = Card;

function LandingPage(props) {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (props.match.path === '/popular') {
            let body = {
                skip: Skip,
                limit: Limit,
                sort: "1",
            }
            getProduct(body)
        } else if(props.match.path === '/view') {
            let body = {
                skip: Skip,
                limit: Limit,
                sort: "2",
            }
            getProduct(body)
        }
        else {
            let body = {
                skip: Skip,
                limit: Limit
            }
            getProduct(body)
        }  
    }, [])

    // 상품 가져오기
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

    // 더보기
    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        if (SearchTerm) {
            
            let body = {
                skip: skip,
                limit: Limit,
                filters: Filters,
                loadMore: true,
                searchTerm: SearchTerm,
            };
            getProduct(body);
        } else {
            let body = {
                skip: skip,
                limit: Limit,
                loadMore: true,
            }
            getProduct(body);
        }
        setSkip(skip);
    }

    // 상품 목록  
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={12} md={10} xs={24} key={index}>
                <Card
                    cover={
                        <a href={`/product/${product._id}`}>
                            <ImageSlider images={product.images} />
                        </a>
                    }
                >
                    <Meta title={product.title} description={`$${product.price}`}/>
                </Card>
            </Col>
        );
    })

    // 필터 결과
    const showFilterResults = (filters) => {

        let body = {
            skip: 0,
            limit: 4,
            filters: filters
        }

        getProduct(body)
        setSkip(0)
    }

    // 금액
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }
    
    // 필터
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters

        //console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilterResults(newFilters)
        setFilters(newFilters)
    }

    // 검색
    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        }

        setSearchTerm(newSearchTerm);
        getProduct(body)
        setSkip(0);
    
    }
    
    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel AnyWhere~!
                    <RocketOutlined />
                </h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={(filters) => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={(filters) => handleFilters(filters, "price")} />
                </Col>
            </Row>
            {/* Search */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                }}
            >
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>
            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br />
            {PostSize >= Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage
