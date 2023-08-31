import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../elements/Button";

function SuccessOrder() {
  const isLogin = localStorage.getItem("token");
  const location = useLocation();
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
        <OrderBooth>
          수령 부스<p>{location.state.store_name}</p>{" "}
        </OrderBooth>
        <OrderProducts>
          <span>{location.state.item}</span>
          {location.state.quantity === 1
            ? ""
            : ` 외 ${location.state.quantity - 1}개`}
        </OrderProducts>{" "}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
  p {
    font-size: 18px;
    font-weight: 500;
  }
`;

const OrderProducts = styled.p`
  span {
    font-weight: 600;
  }
  margin-bottom: 30px;
`;

export default SuccessOrder;
