import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteCartItemDB, modifyCartDB } from "../redux/modules/cart";
import CartCheckBox from "./CartCheckBox";
import UserModal from "./UserModal";
import Button from "../elements/Button";
//assets
import MinusIcon from "../assets/images/minus-icon_2.svg";
import PlusIcon from "../assets/images/plus-icon_2.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import ModalPortal from "../helpers/Portal";

function CartGrid(props) {
  const { cart_sum_grid, sum, onChange, checked, isCheck } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartList = useSelector((state) => state.cart.cartList);
  const product = useSelector((state) => state.product.products);
  const cartId = cartList.map((c, i) => c.product_id);
  const item = product.filter((i) => cartId.includes(i.product_id));

  const [modal, setModal] = useState(0);
  const [itemId, setItemId] = useState("");
  const [count, setCount] = useState(props.quantityList);

  const cartToPayment = () => {
    if (props.is_active === true && isCheck === true) {
      navigate("/payment", {
        state: {
          item: props.checkedProduct[0],
          product_id: props.checkedProduct[0].product_id,
          quantity: props.checkCartItem[0].quantity,
          order_kind: "cart_one_order",
          total_price:
            props.checkedProduct[0].price * props.checkCartItem[0].quantity,
        },
      });
    } else if (isCheck === false) {
      window.alert("구매하실 상품을 선택해주세요.");
    } else if (props.is_active === false) {
      const itemData = {
        product_id: props.item.product_id,
        quantity: count,
        is_active: true,
        // item[i].product_id === cartList[i].product_id
      };
      dispatch(modifyCartDB(props.cart_item_id, itemData));
      navigate("/payment", {
        state: {
          item: props.checkedProduct[0],
          quantity: props.checkCartItem[0].quantity,
          order_kind: "cart_one_order",
          total_price:
            props.checkedProduct[0].price * props.checkCartItem[0].quantity +
            props.checkedProduct[0].shipping_fee,
          shipping_fee: props.item.shipping_fee,
        },
      });
    }
  };

  if (cart_sum_grid) {
    return (
      <SumGrid>
        <div className="product-price">
          <div>
            <p>총 상품금액</p>
            <span>{sum.toLocaleString()}</span>
            <span>원</span>
          </div>
          <img src={MinusIcon} alt="" />
          <div>
            <p>상품 할인</p>
            <span>0</span>
            <span>원</span>
          </div>
          <img src={PlusIcon} alt="" />
        </div>
        <div className="price-sum">
          <p>결제 예정 금액</p>
          <div>
            <span>{sum.toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>
      </SumGrid>
    );
  }
  return (
    <>
      {
        <Grid>
          <CartCheckBox
            margin="0 40px 0 30px"
            onChange={onChange}
            checked={checked}
          />
          <div className="cart-info">
            <img src={props.item?.image} alt="" />
            <div className="info-text">
              <p>{props.item?.store_name}</p>
              <p>{props.item?.product_name}</p>
              <p>{props.item?.price.toLocaleString()}원</p>
            </div>
          </div>
          <Button
            quantity_button
            margin="0 148px 0 0"
            _onClickMinus={() => {
              setModal(1);
              setItemId(props.product_id);
            }}
            _onClickPlus={() => {
              setModal(1);
              setItemId(props.product_id);
            }}
          >
            {props.quantityList}
          </Button>
          <div className="cart-price">
            <p>{(props.item?.price * props.quantityList).toLocaleString()}원</p>
            <Button
              width="130px"
              height="40px"
              font_weight="500"
              _onClick={cartToPayment}
            >
              주문하기
            </Button>
          </div>
          <img
            className="icon-delete"
            src={DeleteIcon}
            alt=""
            onClick={() => setModal(2)}
          />
          <ModalPortal>
            {itemId === props.product_id && modal === 1 ? (
              <UserModal
                modal_to_check
                children={count}
                _onClickMinus={() => {
                  if (1 < count) {
                    setCount(count - 1);
                  }
                }}
                _onClickPlus={() => {
                  if (count < props.item.stock) {
                    setCount(count + 1);
                  }
                }}
                btn_children_1="취소"
                btn_children_2="수정"
                margin="26px 0 0 0"
                _onClick={() => setModal(0)}
                _onClick2={() => {
                  const itemData = {
                    product_id: props.product_id,
                    quantity: count,
                    is_active: true, //isCheck,
                  };
                  const cartItemId = props.cart_item_id;
                  dispatch(modifyCartDB(cartItemId, itemData));
                  setModal(0);
                }}
                _onClickBg={() => setModal(0)}
              />
            ) : (
              modal === 2 && (
                <UserModal
                  modal_to_check
                  _disabled={true}
                  children2="상품을 삭제하시겠습니까?"
                  btn_children_1="취소"
                  btn_children_2="확인"
                  margin="40px 0 0 0"
                  _onClick={() => setModal(0)}
                  _onClick2={() => {
                    dispatch(deleteCartItemDB(props.cart_item_id));
                    setModal(0);
                  }}
                  _onClickBg={() => setModal(0)}
                />
              )
            )}
          </ModalPortal>
        </Grid>
        // })
      }
    </>
  );
}

const Grid = styled.div`
  width: 1280px;
  height: 200px;
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1320px) {
    width: 900px;
  }
  .cart-info {
    display: flex;
    margin-right: 48px;
    align-items: center;
    @media screen and (max-width: 1320px) {
      margin-right: 35px;
    }
    img {
      width: 160px;
      height: 160px;
      border-radius: 10px;
      margin-right: 36px;
    }
    .info-text {
      align-self: center;
      p {
        &:first-child {
          font-size: 14px;
          color: #767676;
          margin-bottom: 10px;
        }
        &:nth-child(2) {
          width: 418px;
          font-size: 18px;
          margin-bottom: 10px;
          @media screen and (max-width: 1320px) {
            width: 194.8px;
          }
        }
        &:nth-child(3) {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 40px;
        }
        &:nth-child(4) {
          font-size: 14px;
          color: #767676;
        }
      }
    }
  }
  .cart-price {
    margin-left: 138px;
    text-align: center;
    @media screen and (max-width: 1320px) {
      margin-left: 35px;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      color: #eb5757;
      margin-bottom: 26px;
    }
  }
  .icon-delete {
    position: absolute;
    top: 18px;
    right: 18px;
    cursor: pointer;
  }
`;

const SumGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  height: 150px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 70px 0 40px;
  text-align: center;
  @media screen and (max-width: 1320px) {
    width: 900px;
  }
  .product-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 121px;
    margin-right: 229px;
    width: 100%;
    @media screen and (max-width: 1320px) {
      margin: 0 90px;
    }
    div {
      p {
        margin-bottom: 12px;
      }
      span {
        &:nth-child(2) {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
  .price-sum {
    margin-right: 91px;
    width: 238px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-weight: bold;
    }
    p {
      font-weight: bold;
      margin-bottom: 5px;
    }
    span {
      color: #eb5757;
      &:nth-child(2) {
        font-size: 36px;
        font-weight: bold;
      }
      &:nth-child(3) {
        font-size: 18px;
      }
    }
  }
`;

export default CartGrid;
