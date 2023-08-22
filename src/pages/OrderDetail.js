import React, {useEffect, useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { api } from "../shared/api";
import { useSelector } from "react-redux";

import Nav from "../components/Nav";
import { useDispatch } from "react-redux";
import { getOneProductDB } from "../redux/modules/product";
import PaymentGrid from "../components/PaymentGrid";

function OrderDetail() {
  const isLogin = localStorage.getItem("token");
  const location = useLocation();
  const {id} = useParams();
  const productList = useSelector((state) => state.product.products);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(()=>{
    const fetchOrderDetails = async () => {
        await api.get(`/order/${id}`).then((res) => {
            setOrderDetails(res.data.results[0]);
            setOrderProducts(res.data.results[0].order_items);
        })
    }
  })

  return (
    <>
      <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
      <Main>
        <h1>주문 상세</h1>
        <OrderInfo>
          <p>주문 번호 : {orderDetails.order_id}</p>
          <p>주문 일자 : {orderDetails.date}</p>
          <p>결제 방법 : {orderDetails.payment_type}</p>
          <p>픽업 상태 : {orderDetails.pickup_state}</p>
        </OrderInfo>

        <PaymentNav>
          <p className="product-info">상품정보</p>
          <div className="product-price">
            <p>주문금액</p>
          </div>
        </PaymentNav>
        {orderProducts.map((item, idx) => {
            return(
                <PaymentGrid
                key={item}
                {...item}
                item={location.state.checkedProduct.find(
                    (p, i) => item.product_id === p.product_id
                  )
                }
                />
            )
        })}


        <div className="price-sum">
          <p>총 주문금액</p>
          <p>{orderDetails.total_price}원</p>
        </div>
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1300px) {
    width: 800px;
    margin: 0 auto;
  }
  h1 {
    margin: 54px 0 52px;
    font-size: 36px;
  }
  .price-sum {
    margin: 30px 0 96px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 1280px;
    @media screen and (max-width: 1300px) {
      width: 100%;
    }
    P {
      &:first-child {
        font-size: 18px;
        font-weight: 500;
        margin-right: 10px;
      }
      &:nth-child(2) {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and(max-width: 1300px){
    width: 100%;
  }
`;

const PaymentNav = styled.div`
  width: 1280px;
  height: 60px;
  border-radius: 10px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1300px) {
    width: 100%;
  }
  p {
    width: clac(50% / 3);
    font-size: 18px;
    text-align: center;
    @media screen and (max-width: 1300px) {
      width: 100%;
    }
  }
  .product-info {
    width: 58%;
    text-align: center;
  }
  .product-price {
    display: flex;
    width: 42%;
    justify-content: space-around;
  }
`;

export default OrderDetail;
