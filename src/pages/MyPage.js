import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  darkGreyColor,
  greyColor,
  lightMainColor,
} from "../assets/GlobalStyle";
import { api, apis } from "../shared/api";

function MyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("type");
  const isLogin = localStorage.getItem("token");
  const payment = useSelector((state) => state.payment.paymentList);
  const user = useSelector((state) => state.user.user);
  const [orderList, setOrderList] = useState([]);

  // 회원 정보 가져오기

  // 픽업 대기, 주문 완료에 따른 주문 리스트 가져오기
  const getOrder = async () => {
    apis
      .getOrder(id)
      .then((res) => {
        setOrderList((prev) => prev.concat(res.data.results));
      })
      .error((err) => {
        console.log("주문 내역을 찾을 수 없습니다", err);
      });
  };

  // useEffect(() => {
  //   dispatch(addPaymentDB(id));
  // }, [dispatch, id]);

  const onOrderClick = (e) => {
    navigate(`/order-detail`);
  };

  return (
    <div>
      {userType === "SELLER" ? <Nav /> : <Nav user_nav />}
      <MyPageContainer>
        <ContentContainer>
          <ContentTitle>회원 정보</ContentTitle>
          <MemberInfo>
            <p>이름: 홍길동</p>
            <p>아이디: charles</p>
            <p>전화번호: 010-1234-1234 </p>
          </MemberInfo>
        </ContentContainer>
        <ContentContainer>
          <ContentTitle>주문 내역</ContentTitle>
          <OrderField>
            <p>주문일자</p>
            <p>주문번호</p>
            <p>주문상태</p>
            <p>주문금액</p>
          </OrderField>
          <OrderList>
            {/* {payment && payment.length === 0 ? (
              <p>주문 내역이 없습니다.</p>
            ) : (
              orderList.map((order, idx) => {
                return (
                  <Order key={idx}>
                    <p>{order.order_date}</p>
                    <p>{order.order_id}</p>
                    <p>{order.order_state}</p>
                    <p>{order.total_price}</p>
                    <button id={order.order_id} onClick={onOrderClick}>
                      주문상세
                    </button>
                  </Order>
                );
              })
            )} */}
            {/* dummy */}
            <Order>
              <p>2023.08.20</p>
              <p>1002131122</p>
              <p>픽업 대기</p>
              <p>66669원</p>
              <button onClick={onOrderClick}>주문상세</button>
            </Order>
          </OrderList>
        </ContentContainer>
      </MyPageContainer>
      <Footer />
    </div>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 30px;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  border: 1px solid ${greyColor};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  position: relative;
  #edit {
    background-color: ${lightMainColor};
    border: 1px solid ${darkGreyColor};
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    top: 30px;
    right: 20px;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-radius: 10px;
  background-color: ${lightMainColor};
  padding: 20px;
  margin-bottom: 5px;
`;

const ContentTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin: 20px 5px;
`;

const OrderField = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${lightMainColor};
  padding: 5px 100px 5px 5px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Order = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 10px;
  padding: 5px 100px 5px 5px;
  border: 1px solid ${darkGreyColor};
  border-radius: 10px;
  position: relative;
  button {
    background-color: ${lightMainColor};
    border: 1px solid ${darkGreyColor};
    border-radius: 5px;
    padding: 1px 10px;
    position: absolute;
    right: 25px;
  }
`;
