import React from "react";
import { useLocation } from "react-router-dom";
// Components
import styled from "styled-components";
import DeliveryInfo from "../components/DeliveryInfo";
import Nav from "../components/Nav";
import PaymentGrid from "../components/PaymentGrid";

function Payment() {
  const location = useLocation();
  const orderKind = location.state.order_kind;
  const price = location.state.total_price - location.state.shipping_fee;

  return (
    <div>
      <Nav user_nav />
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
          <p>{price.toLocaleString()}원</p>
        </div>
        <DeliveryInfo
          shipping_fee={
            location.state.shipping_fee === 0 ? 0 : location.state.shipping_fee
          }
          price={location.state.total_price - location.state.shipping_fee}
          quantity={location.state.quantity}
          product_id={location.state.product_id}
          product_name={location.state.product_name}
          store_name={location.state.store_name}
          order_kind={location.state.order_kind}
          difference={location.state.difference}
          item={orderKind === "cart_one_order" ? location.state.item : ""}
          products={location.state.checkCartItem}
          checkedProduct={location.state.checkedProduct}
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
