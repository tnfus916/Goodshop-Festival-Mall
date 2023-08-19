import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductDB } from "../redux/modules/product";
// Components
import styled from "styled-components";
import DeliveryInfo from "../components/DeliveryInfo";
import Nav from "../components/Nav";
import PaymentGrid from "../components/PaymentGrid";

function Payment() {
  const isLogin = localStorage.getItem("token");
  const location = useLocation();
  const productList = useSelector((state) => state.product.products);
  const cart = useSelector((state) => state.cart.cartList);
  const product = productList.filter(
    (p) => p.product_id === location.state.product_id
  );
  const orderKind = location.state.order_kind;
  const sum = location.state.total_price;

  return (
    <div>
      <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
      <Main>
        <h1>주문/결제하기</h1>
        <PaymentNav>
          <p className="product-info">상품정보</p>
          <div className="product-price">
            <p>주문금액</p>
          </div>
        </PaymentNav>
        {orderKind === "direct_order" || orderKind === "cart_one_order" ? (
          <PaymentGrid
            item={location.state.item}
            quantity={location.state.quantity}
            order_kind={orderKind}
          />
        ) : null}
        {orderKind === "cart_order" &&
          location.state.checkCartItem.map((cartItem, i) => {
            return (
              <PaymentGrid
                key={cartItem.product_id}
                {...cartItem}
                item={location.state.checkedProduct.find(
                  (p, i) => cartItem.product_id === p.product_id
                )}
                order_kind={orderKind}
              />
            );
          })}
        <div className="price-sum">
          <p>총 주문금액</p>
          <p>{sum.toLocaleString()}원</p>
        </div>
        <DeliveryInfo
          shipping_fee={
            location.state.shipping_fee === 0 ? 0 : location.state.shipping_fee
          }
          price={location.state.total_price - location.state.shipping_fee}
          quantity={location.state.quantity}
          product_id={location.state.product_id}
          order_kind={location.state.order_kind}
          difference={location.state.difference}
        />
      </Main>
    </div>
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
    width: 1280px;
    justify-content: flex-end;
    @media screen and (max-width: 1300px) {
      width: 100%;
    }
    p {
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
const PaymentNav = styled.nav`
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
    width: calc(50% / 3);
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

export default Payment;
