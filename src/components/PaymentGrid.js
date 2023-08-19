import React from "react";
import styled from "styled-components";

function PaymentGrid(props) {
  return (
    <Grid>
      <div className="product-info">
        <img src={props.item.image} alt="" />
        <div>
          <p>{props.item.shop_name}</p>
          <p>{props.item.product_name}</p>
          <p>수량: {props.quantity}개</p>
        </div>
      </div>
      <div className="price-container">
        <p>{(props.item.price * props.quantity).toLocaleString()}원</p>
      </div>
    </Grid>
  );
}

const Grid = styled.div`
  width: 1280px;
  height: 130px;
  border-bottom: 1px solid #c4c4c4;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 1300px) {
    width: 100%;
  }
  .product-info {
    width: 50%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    img {
      width: 104px;
      height: 104px;
      border-radius: 10px;
      margin-right: 36px;
    }
    p {
      &:first-child,
      &:nth-child(3) {
        font-size: 14px;
        margin-bottom: 6px;
        color: #767676;
      }
      &:nth-child(2) {
        font-size: 18px;
        margin: 6px 0 10px;
      }
    }
  }
  .price-container {
    width: 40%;
    display: flex;
    justify-content: space-around;
    p {
      width: calc(50% / 3);
      font-size: 18px;
      text-align: center;
      @media screen and (max-width: 1300px) {
        width: 100%;
      }
    }
  }
`;

export default PaymentGrid;
