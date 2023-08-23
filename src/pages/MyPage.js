import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addPaymentDB } from "../redux/modules/payment";
import { darkGreyColor, lightMainColor } from "../assets/GlobalStyle";
import { api } from "../shared/api";

function MyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("type");
  const isLogin = localStorage.getItem("token");
  // const payment = useSelector((state) => state.payment.paymentList);
  // const user= useSelector((state) => state.user.id);
  const [waitOrderList, setWaitOrderList] = useState([]);
  const [completedOrderList, setCompletedOrderList] = useState([]);

  // 회원 정보 가져오기

  // 픽업 대기, 주문 완료에 따른 주문 리스트 가져오기
  const getWaitingOrder = async () => {
    await api.get(`/order/${id}`).then((res) => {
      setWaitOrderList((prev) => prev.concat(res.data.results));
    });
  };

  const getCompletedOrder = async () => {
    await api.get(`/order/${id}`).then((res) => {
      setCompletedOrderList((prev) => prev.concat(res.data.results));
    });
  };

  // useEffect(() => {
  //   dispatch(addPaymentDB(id));
  // }, [dispatch, id]);

  const onEditClick = () => {
    navigate(`/mypage/edit`);
  };

  const onWaitingOrderClick = (e) => {
    navigate(`/order-detail/${e.target.id}`);
  };

  const onCompletedOrderClick = (e) => {
    navigate(`/order-detail/${e.target.id}`);
  };

  return (
    <div>
      {userType === "SELLER" ? <Nav /> : <Nav user_nav />}
      <MyPageContainer>
        <MemberInfoContainer>
          <ContentTitle>회원 정보</ContentTitle>
          <MemberInfo>
            <p>이름: </p>
            <p>이메일: </p>
            <p>전화번호: </p>
            <button onClick={onEditClick}>회원정보수정</button>
          </MemberInfo>
        </MemberInfoContainer>
        <WaitingOrderContainer>
          <ContentTitle>픽업 대기</ContentTitle>
          <OrderField>
            <p>주문일자</p>
            <p>주문번호</p>
            <p>결제방법</p>
            <p>주문금액</p>
          </OrderField>
          <OrderList>
            {waitOrderList.map((order, idx) => {
              return (
                <Order key={idx}>
                  <p>{order.order_date}</p>
                  <p>{order.order_id}</p>
                  <p>{order.payment_type}</p>
                  <p>{order.total_price}</p>
                  <button id={order.order_id} onClick={onWaitingOrderClick}>
                    주문상세
                  </button>
                </Order>
              );
            })}
            <Order>
              <p>주문일자</p>
              <p>주문번호</p>
              <p>결제방법</p>
              <p>주문금액</p>
              <button onClick={onCompletedOrderClick}>주문상세</button>
            </Order>
          </OrderList>
        </WaitingOrderContainer>
        <CompletedOrderContainer>
          <ContentTitle>픽업 완료</ContentTitle>
          <OrderField>
            <p>주문일자</p>
            <p>주문번호</p>
            <p>결제방법</p>
            <p>주문금액</p>
          </OrderField>
          <OrderList>
            {completedOrderList.map((order, idx) => {
              return (
                <Order key={idx}>
                  <p>{order.order_date}</p>
                  <p>{order.order_id}</p>
                  <p>{order.payment_type}</p>
                  <p>{order.total_price}</p>
                  <button id={order.order_id} onClick={onCompletedOrderClick}>
                    주문상세
                  </button>
                </Order>
              );
            })}
            <Order>
              <p>주문일자</p>
              <p>주문번호</p>
              <p>결제방법</p>
              <p>주문금액</p>
              <button onClick={onCompletedOrderClick}>주문상세</button>
            </Order>
            <Order>
              <p>주문일자</p>
              <p>주문번호</p>
              <p>결제방법</p>
              <p>주문금액</p>
              <button onClick={onCompletedOrderClick}>주문상세</button>
            </Order>
          </OrderList>
        </CompletedOrderContainer>
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

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`;

const WaitingOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
`;

const CompletedOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
`;

const ContentTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
  margin: 20px 0px;
`;

const OrderField = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  background-color: ${lightMainColor};
  padding: 5px;
  border-radius: 10px;
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px solid ${darkGreyColor};
  border-radius: 5px;
`;

const Order = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 99%;
  border: 1px solid ${darkGreyColor};
  border-radius: 10px;
  margin: 10px;
  padding: 3px;
  button {
    background-color: ${lightMainColor};
    border: 1px solid ${darkGreyColor};
    border-radius: 5px;
    position: absolute;
    right: 70px;
  }
`;
