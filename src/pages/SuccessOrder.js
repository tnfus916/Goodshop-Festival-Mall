import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../elements/Button";

function SuccessOrder(props) {
  const isLogin = localStorage.getItem("token");
  const location = useLocation();
  const cart = useSelector((state) => state.cart.cartList);
  const navigate = useNavigate();
  console.log(location.state);
  return (
    <div>
      <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
      <Main>
        <OrderCompleteTitle>주문 완료</OrderCompleteTitle>
        <OrderCompleteDescWrapper>
          <OrderCompleteDescTxt>주문이 완료되었습니다.</OrderCompleteDescTxt>
          <OrderCompleteDescTxt>
            해당 부스에서 상품을 받아가세요.
          </OrderCompleteDescTxt>
        </OrderCompleteDescWrapper>
        {/* 주문 번호 */}
        <OrderNumWrapper>
          <OrderNumTxt>주문 번호</OrderNumTxt>
          <OrderNum>{Math.floor(Math.random() * 2000)}</OrderNum>
        </OrderNumWrapper>
        {/* 수령 정보 */}
        <OrderBooth>수령 부스: {Math.floor(Math.random() * 11)} </OrderBooth>
        <OrderProducts>
          {location.state.item}
          {location.state.order_kind === "cart_one_order" || "direct_order"
            ? ""
            : `외 ${location.state.quantity - 1}개`}
        </OrderProducts>{" "}
        {/*주문상품 연동되도록 수정 필요 */}
        <Button
          children="메인으로"
          width="228px"
          height="68px"
          font_size="24px"
          font_weight="700"
          _onClick={() => navigate("/")}
        />
      </Main>
    </div>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0px;
`;

const OrderCompleteTitle = styled.p`
  font-size: 50px;
  font-weight: 900;
`;

const OrderCompleteDescWrapper = styled.div`
  text-align: center;
  margin: 20px 0px;
`;

const OrderCompleteDescTxt = styled.p`
  margin: 5px 0px;
`;

const OrderNumWrapper = styled.div`
  text-align: center;
  margin: 30px 0px;
`;

const OrderNumTxt = styled.p`
  font-weight: 600;
`;

const OrderNum = styled.p`
  font-size: 70px;
  font-weight: 1000;
  color: #fe5c5c;
`;

const OrderBooth = styled.p`
  margin: 20px 0px;
`;

const OrderProducts = styled.p`
  font-weight: bold;
  margin-bottom: 30px;
`;

export default SuccessOrder;
