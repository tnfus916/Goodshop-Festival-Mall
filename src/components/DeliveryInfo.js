import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { addPaymentDB } from "../redux/modules/payment";
import styled from "styled-components";
// Component
import PostCodeModal from "./PostCode";
//element
import Input from "../elements/Input";
import Button from "../elements/Button";
import { mainColor } from "../assets/GlobalStyle";
import { useNavigate } from "react-router-dom";
import product from "../redux/modules/product";

function DeliveryInfo(props) {
  const {
    shipping_fee,
    price,
    product_id,
    product_name,
    quantity,
    order_kind,
    store_name,
    item,
    products,
    checkedProduct,
  } = props;

  console.log(products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderer, setOrderer] = useState();
  const [orderPhone, setOrderPhone] = useState();
  const [orderPhone2, setOrderPhone2] = useState();
  const [orderPhone3, setOrderPhone3] = useState();
  const fullOrdererPhone = orderPhone + orderPhone2 + orderPhone3;
  const [paymentMethod, setPaymentMethod] = useState();
  const [isCheck, setIsCheck] = useState();

  const product = checkedProduct
    ? checkedProduct.filter((p, i) => products[0].product_id === p.product_id)[0]
    : products;

  //   const fullPhoneNum = phone + phone2 + phone3;
  //   const fullAddress = address + detailAddress;
  const sumPrice = price + shipping_fee;

  const paymentBtnCheck = () => {
    if (!isCheck || !orderer || fullOrdererPhone === "") {
      return true;
    } else {
      return false;
    }
  };

  const handlePayment = () => {
    const data = {
      product_id: product_id,
      quantity: quantity,
      order_kind: order_kind,
      payment_method: paymentMethod,
      total_price:
        props.order_kind === "cart_one_order" || "direct_order"
          ? sumPrice
          : sumPrice + props.difference,
    };
    
    console.log("props");
    console.log(props);

    // (임시)결제 내역 DB에 추가하기 전에 주문 완료 페이지로 연결
    navigate("/order-info", {
      state: {
        order_kind: order_kind,
        item: product.product_name,
        store_name: product.store_name,
        quantity: products.length,
      },
    });
    dispatch(addPaymentDB(data));
  };

  return (
    <Info>
      <OrderingPersonInfo>
        <p className="container-title">주문자 정보</p>
        <div className="order-name">
          <p>이름</p>
          <Input
            radius="none"
            margin_top="0"
            margin_bottom="0"
            width="334px"
            height="40px"
            border="1px solid ${greu"
            borderColor="#C4C4C4"
            borderBottomColor="#C4C4C4"
            _onChange={(e) => setOrderer(e.target.value)}
          />
        </div>
        <div className="order-phone">
          <p className="cellphone">휴대폰</p>
          <div className="phone-input">
            <Input
              radius="none"
              width="80px"
              height="40px"
              margin_top="0"
              margin_bottom="0"
              borderColor="#C4C4C4"
              borderBottomColor="#C4C4C4"
              _onChange={(e) => setOrderPhone(e.target.value)}
            />
            <p>-</p>
            <Input
              radius="none"
              width="80px"
              height="40px"
              margin_top="0"
              margin_bottom="0"
              borderColor="#C4C4C4"
              borderBottomColor="#C4C4C4"
              _onChange={(e) => setOrderPhone2(e.target.value)}
            />
            <p>-</p>
            <Input
              radius="none"
              width="80px"
              height="40px"
              margin_top="0"
              margin_bottom="0"
              borderColor="#C4C4C4"
              borderBottomColor="#C4C4C4"
              _onChange={(e) => setOrderPhone3(e.target.value)}
            />
          </div>
        </div>
        <div className="order-email">
          <p>이메일</p>
          <Input
            radius="none"
            margin_top="0"
            margin_bottom="0"
            width="334px"
            height="40px"
            border="1px solid #C4C4C4"
            borderColor="#C4C4C4"
            borderBottomColor="#C4C4C4"
          />
        </div>
      </OrderingPersonInfo>
      <PaymentInfo>
        <div className="payment-option">
          <p className="container-title">결제수단</p>
          <div className="option">
            <p>결제는 현장에서 진행됩니다.</p>
          </div>
        </div>
        <div className="final-payment">
          <p className="final-payment_txt">최종주문 정보</p>
          <div className="final-payment_info">
            <div className="payment-container_top">
              <div>
                <p>-상품금액</p>
                <p>
                  <span>{price.toLocaleString()}</span>
                  <span>원</span>
                </p>
              </div>
              <div>
                <p>-할인금액</p>
                <p>
                  <span>0</span>
                  <span>원</span>
                </p>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <p>-결제금액</p>
                <p>{price.toLocaleString()}원</p>
              </div>
            </div>
            <div className="payment-container_bottom">
              <div className="consent-check">
                <input type="checkbox" onChange={() => setIsCheck(!isCheck)} />
                <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
              </div>
              <Button
                width="228px"
                height="68px"
                font_size="24px"
                font_weight="700"
                _disabled={paymentBtnCheck()}
                _onClick={handlePayment}
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </PaymentInfo>
    </Info>
  );
}

const Info = styled.div`
  width: 1280px;
  @media screen and (max-width: 1300px) {
    width: 100%;
  }
  .container-title {
    font-size: 24px;
    font-weight: 500;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: #c4c4c4;
      margin: 18px 0 10px;
    }
  }
`;

const OrderingPersonInfo = styled.div`
  width: 100%;
  .order-name {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c4c4c4;
    padding: 12px 20px;
    p {
      flex: 1;
      @media screen and (max-width: 1300px) {
        flex: 2;
      }
    }
    label {
      flex: 9;
      @media screen and (max-width: 1300px) {
        flex: 8;
      }
    }
  }
  .order-phone {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c4c4c4;
    padding: 12px 20px;
    .cellphone {
      flex: 1;
      @media screen and (max-width: 1300px) {
        flex: 2;
      }
    }
    .phone-input {
      display: flex;
      align-items: center;
      flex: 9;
      @media screen and (max-width: 1300px) {
        flex: 8;
      }
      p {
        margin: 0 10px;
      }
    }
  }
  .order-email {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c4c4c4;
    padding: 12px 20px;
    margin-bottom: 40px;
    p {
      flex: 1;
      @media screen and (max-width: 1300px) {
        flex: 2;
      }
    }
    label {
      flex: 9;
      @media screen and (max-width: 1300px) {
        flex: 8;
      }
    }
  }
`;

const PaymentInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 100px;
  @media screen and (max-width: 1300px) {
    display: flex;
    flex-direction: column;
  }
  .payment-option {
    width: 100%;
    margin-right: 40px;
    @media screen and (max-width: 1300px) {
      margin-bottom: 70px;
    }
    .container-title {
      font-size: 24px;
      font-weight: 500;
    }
    .option {
      padding-bottom: 18px;
      border-bottom: 1px solid #c4c4c4;
      label:nth-child(n + 2):nth-child(-n + 5) {
        input {
          margin-left: 15px;
        }
      }
      input {
        margin-right: 10px;
      }
    }
  }
  .final-payment {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    .final-payment_txt {
      width: 480px;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 18px;
      @media screen and (max-width: 1300px) {
        text-align: left;
        margin-bottom: 50px;
      }
    }
    .final-payment_info {
      width: 480px;
      height: 400px;
      border: 2px solid ${mainColor};
      border-radius: 10px;
      overflow: hidden;
      @media screen and (max-width: 1300px) {
        margin: 0 auto;
      }
      .payment-container_top {
        width: 100%;
        height: 218px;
        padding: 34px 30px 0;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(n + 2):nth-child(-n + 3) {
            margin-top: 12px;
          }
          &:nth-child(3) {
            display: flex;
            flex-direction: column;
            div {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
            &::after {
              content: "";
              display: block;
              width: 100%;
              height: 1px;
              background-color: #c4c4c4;
              margin: 18px 0 24px;
            }
          }
          &:nth-child(4) {
            p:last-child {
              color: #eb5757;
              font-size: 24px;
              font-weight: 700;
            }
          }
          p > span:first-child {
            font-size: 18px;
            font-weight: 700;
            margin-right: 4px;
          }
          p > span:nth-child(2) {
            font-size: 14px;
            color: #767676;
          }
        }
      }
      .payment-container_bottom {
        width: 100%;
        height: 182px;
        background-color: #f2f2f2;
        padding: 32px 30px 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .consent-check {
          display: flex;
          width: 100%;
          align-items: center;
          margin-bottom: 32px;
          input {
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

export default DeliveryInfo;
