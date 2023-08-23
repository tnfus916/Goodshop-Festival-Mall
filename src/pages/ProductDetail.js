import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneProductDB } from "../redux/modules/product";
import { addCartDB, getCartDB } from "../redux/modules/cart";
//components
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import UserModal from "../components/UserModal";
//elements
import Button from "../elements/Button";
//helpers
import ModalPortal from "../helpers/Portal";
import {
  darkGreyColor,
  greyColor,
  mainColor,
  redColor,
} from "../assets/GlobalStyle";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.productOne);
  const product_stock = product.stock;
  const cartList = useSelector((state) => state.cart.cartList);
  const cartItemId = cartList === [] ? null : cartList.map((c) => c.product_id);
  const cartItem =
    cartList === []
      ? null
      : cartList.find((c) => c.product_id === product.product_id);
  const isLogin = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(0);
  const [itemDupCheck, setItemDupCheck] = useState(true);
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    dispatch(getOneProductDB(id));
    dispatch(getCartDB());
  }, [dispatch, id]);

  const handleMinus = () => {
    if (1 < quantity) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity <= product_stock - 1) {
      setQuantity(quantity + 1);
    }
  };

  const handleBuyItNow = () => {
    if (!isLogin) {
      setModal(2);
    } else {
      navigate("/payment", {
        state: {
          item: product,
          product_id: product.product_id,
          quantity: quantity,
          product_image: product.image,
          product_name: product.product_name,
          shipping_fee: product.shipping_fee,
          store_name: product.store_name,
          order_kind: "direct_order",
          total_price: product.price * quantity + product.shipping_fee,
        },
      });
    }
  };

  const handleAddCart = () => {
    const itemData = {
      product_id: product.product_id,
      quantity: quantity,
      check: itemDupCheck,
    };
    if (!isLogin) {
      setModal(2);
    }
    if (
      cartItemId.includes(product.product_id) &&
      cartItem.quantity + quantity <= product.stock
    ) {
      setModal(1);
    } else if (
      cartList === [] ||
      !cartItemId.includes(product.product_id) ||
      cartItem.quantity + quantity > product.stock
    ) {
      dispatch(addCartDB(itemData, navigate));
    }
  };

  const modalAddCart = () => {
    const itemData = {
      product_id: product.product_id,
      quantity: quantity,
      check: itemDupCheck,
    };
    if (
      cartItem.quantity + quantity <= product.stock ||
      cartItem.quantity + quantity > product.stock
    ) {
      dispatch(addCartDB(itemData, navigate));
    }
  };

  return (
    <div>
      {userType === "SELLER" ? <Nav /> : <Nav user_nav />}
      <ProductDetailContainer>
        <img src={product.image} alt="" />
        <div className="container-right">
          <div className="info">
            <p>{product.store_name}</p>
            <p>{product.product_name}</p>
            <span className="info-price">
              {product.price?.toLocaleString()}
            </span>
            <span>원</span>
            <p>재고: {product.stock}개 </p>
          </div>
          <div className="info2">
            <Button
              quantity_button
              _onClickMinus={handleMinus}
              _onClickPlus={handlePlus}
            >
              {quantity}
            </Button>
          </div>
          <div className="info3">
            <p>총 상품 금액</p>
            <div>
              <p>총 수량 {quantity}개</p>
              <span>{(product.price * quantity)?.toLocaleString()}</span>
              <span>원</span>
            </div>
          </div>
          <div className="btn-container">
            <Button
              width="300px"
              height="60px"
              margin="0 30px 0 0"
              _disabled={userType === "SELLER" && true}
              _onClick={handleBuyItNow}
            >
              바로구매
            </Button>
            <Button
              width="300px"
              height="60px"
              bg={userType === "SELLER" ? greyColor : mainColor}
              _disabled={userType === "SELLER" && true}
              _onClick={handleAddCart}
            >
              장바구니
            </Button>
          </div>
        </div>
      </ProductDetailContainer>
      <Footer />
      <ModalPortal>
        {modal === 1 ? (
          <UserModal
            modal_to_check
            display="none"
            children2="이미 장바구니에 있는 상품입니다."
            children3="장바구니로 이동하시겠습니까?"
            btn_children_1="아니오"
            btn_children_2="예"
            margin="40px 0 0 0"
            _onClick={() => setModal(0)}
            _onClick2={modalAddCart}
            _onClickBg={() => setModal(0)}
          />
        ) : (
          modal === 2 && (
            <UserModal
              modal_to_check
              _disabled={true}
              children2="로그인이 필요한 서비스입니다."
              children3="로그인 하시겠습니까?"
              btn_children_1="아니오"
              btn_children_2="예"
              margin="30px 0 0 0"
              _onClick={() => setModal(0)}
              _onClick2={() => {
                navigate("/login");
              }}
              _onClickBg={() => setModal(0)}
            />
          )
        )}
      </ModalPortal>
    </div>
  );
}

const ProductDetailContainer = styled.div`
  width: 1250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px auto 140px;
  @media screen and (max-width: 1320px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 600px;
    height: 600px;
    margin-right: 120px;
    @media screen and (max-width: 1320px) {
      margin-right: 0;
    }
  }
  .container-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1320px) {
      width: 600px;
      margin-top: 60px;
    }
    .info {
      margin-bottom: 138px;
      p {
        &:first-child {
          font-size: 18px;
          color: ${darkGreyColor};
          line-height: 23px;
          margin-bottom: 16px;
        }
        &:nth-child(2) {
          font-size: 36px;
          line-height: 45px;
          margin-bottom: 20px;
        }
        &:last-child {
          margin-top: 20px;
          margin-left: 3px;
          font-size: 16px;
          font-weight: 600;
          color: ${redColor};
        }
      }
      span {
        &:nth-child(3) {
          font-size: 36px;
          font-weight: 500;
          line-height: 45px;
        }
        &:nth-child(4) {
          font-size: 18px;
        }
      }
    }
    .info2 {
      &::after {
        display: block;
        content: "";
        width: 100%;
        height: 2px;
        background-color: ${greyColor};
        margin: 30px 0 32px;
      }
      p {
        color: ${darkGreyColor};
        line-height: 20px;
        &::after {
          display: block;
          content: "";
          width: 100%;
          height: 2px;
          background-color: ${greyColor};
          margin: 20px 0 30px;
        }
      }
      .quantity-container {
        width: 150px;
        height: 50px;
        border: 1px solid ${greyColor};
        display: flex;
        border-radius: 5px;
        align-items: center;
        div {
          width: 50px;
          height: 50px;
          border-left: 1px solid ${greyColor};
          border-right: 1px solid ${greyColor};
          text-align: center;
          line-height: 50px;
        }
        button {
          width: 50px;
        }
      }
    }
    .info3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      p {
        font-size: 18px;
        font-weight: 500;
        line-height: 23px;
      }
      div {
        display: flex;
        p {
          font-size: 18px;
          line-height: 23px;
          align-self: center;
          &::after {
            display: inline-block;
            content: "";
            width: 2px;
            height: 23px;
            background-color: ${greyColor};
            vertical-align: bottom;
            margin: 0 12px 0 11px;
          }
        }
        span {
          color: ${mainColor};
          &:nth-child(2) {
            font-size: 36px;
          }
          &:nth-child(3) {
            align-self: center;
          }
        }
      }
    }
    .btn-container {
      display: flex;
    }
  }
`;

export default ProductDetail;
