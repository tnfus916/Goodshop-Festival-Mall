import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSellerProductDB } from "../redux/modules/product";
//components
import Nav from "../components/Nav";
import SellerCenterItem from "../components/SellerCenterItem";
//element
import Button from "../elements/Button";
//assets
import PlusIcon from "../assets/images/icon-plus.svg";
import { mainColor } from "../assets/GlobalStyle";

function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const sellerOrders = useSelector((state) => state.product.sellerOrders);

  useEffect(() => {
    dispatch(getSellerProductDB());
  }, [dispatch]);
  return (
    <div>
      <Nav seller_nav />
      <MainSection>
        <Header>
          <div>
            <p>대시보드</p>
          </div>
          {/* <Button
            src={PlusIcon}
            seller_nav_button
            _onClick={() => navigate("/upload")}
          >
            상품 업로드
          </Button> */}
        </Header>
        <Section>
          <div className="button-container">
            {/* <Button seller_tab_button>
              판매중인 상품({sellerProducts.length})
            </Button> */}
            <Button seller_tab_button>주문(2)</Button>
            {/* <Button seller_tab_button>주문({sellerProducts.length})</Button> */}
          </div>
          <div className="dash-board">
            <div className="info-nav">
              <p>주문번호</p>
              <p>주문상태</p>
              <p>판매가격</p>
              <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
            {sellerProducts.map((p, i) => {
              console.log("p", p);
              console.log("p2", sellerProducts[i].product_id);
              return (
                <Fragment key={p.product_id}>
                  <SellerCenterItem {...p} />
                </Fragment>
              );
            })}
          </div>
        </Section>
      </MainSection>
    </div>
  );
}
const MainSection = styled.div`
  padding: 38px 100px 96px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  div {
    display: flex;
    p {
      &:first-child {
        margin-right: 16px;
        font-size: 36px;
        font-weight: bold;
      }
      &:nth-child(2) {
        font-size: 36px;
        font-weight: 500;
        color: ${mainColor};
      }
    }
  }
`;
const Section = styled.div`
  display: flex;
  .button-container {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
  }
  .dash-board {
    width: 1440px;
    height: 884px;
    border: 1px solid #c4c4c4;
    background-color: #f2f2f2;
    border-radius: 5px;
    .info-nav {
      width: 100%;
      height: 60px;
      background-color: #ffff;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #c4c4c4;
      align-items: center;
      text-align: center;
      p {
        font-size: 18px;
      }
    }
  }
`;

export default OrderList;
