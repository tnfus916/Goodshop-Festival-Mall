import React from "react";
import styled from "styled-components";
import plusBtn from "../assets/images/plus-icon_2.svg";
import minusBtn from "../assets/images/minus-icon_2.svg";
import {
  greyColor,
  lightMainColor,
  mainColor,
  redColor,
  whiteColor,
} from "../assets/GlobalStyle";

const Button = (props) => {
  const {
    children,
    src,
    display,
    width,
    height,
    bg,
    margin,
    padding,
    font_size,
    font_weight,
    _disabled,
    active,
    _onClick,
    _onClickMinus,
    _onClickPlus,
    align,
    seller_nav_button,
    seller_tab_button,
    flex_grow,
    color,
    border,
    hover_color,
    hover_border,
    tab_active_button,
    quantity_button,
  } = props;
  const styles = {
    display,
    width,
    height,
    margin,
    padding,
    font_size,
    font_weight,
    bg,
    align,
    flex_grow,
    color,
    border,
    hover_color,
    hover_border,
  };
  if (seller_nav_button) {
    return (
      <SellerBtn {...styles} onClick={_onClick}>
        <img src={src} alt="shopping-bag_icon" />
        {children}
      </SellerBtn>
    );
  }
  if (seller_tab_button) {
    return <SellerTabBtn disabled={_disabled}>{children}</SellerTabBtn>;
  }
  if (quantity_button) {
    return (
      <QuantityBtn {...styles} disabled={_disabled}>
        <button onClick={_onClickMinus}>
          <img className="minus-btn" src={minusBtn} alt="" />
        </button>
        <div>{children}</div>
        <button onClick={_onClickPlus}>
          <img className="plus-btn" src={plusBtn} alt="" />
        </button>
      </QuantityBtn>
    );
  }
  return (
    <Btn {...styles} disabled={_disabled} onClick={_onClick}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  children: null,
  width: "100%",
  margin: false,
  padding: false,
  _disabled: false,
  _onClick: () => {},
  _onClickMinus: () => {},
  _onClickPlus: () => {},
};

const Btn = styled.button`
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.bg ? props.bg : props.disabled ? greyColor : mainColor};
  color: ${(props) => props.color || "white"};
  border-radius: 5px;
  border: ${(props) => props.border || "none"};
  font-size: ${(props) => props.font_size};
  font-weight: ${(props) => props.font_weight};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  ${(props) => (props.padding ? `padding:${props.margin};` : "")}
    align-self: ${(props) => props.align};
  flex-grow: ${(props) => props.flex_grow};
  &:hover {
    border: ${(props) => props.hover_border};
    color: ${(props) => props.hover_color};
  }
`;

const SellerBtn = styled.button`
  width: 168px;
  height: 54px;
  border-radius: 5px;
  background-color: ${mainColor};
  color: ${whiteColor};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SellerTabBtn = styled.button`
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 15px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: black;
  background-color: ${(props) => (props.disabled ? whiteColor : mainColor)};
  &:hover {
    background-color: ${lightMainColor};
  }
  p {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${redColor};
    color: ${whiteColor};
    line-height: 21px;
  }
`;

const QuantityBtn = styled.div`
  width: 150px;
  height: 50px;
  border: 1px solid ${greyColor};
  display: ${(props) => props.display || "flex"};
  border-radius: 12px;
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
    .minus-btn,
    .plus-btn {
      width: 100%;
    }
  }
`;

export default Button;
