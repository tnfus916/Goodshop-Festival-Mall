import React from "react";
import styled from "styled-components";
import {
  darkGreyColor,
  greyColor,
  mainColor,
  whiteColor,
} from "../assets/GlobalStyle";

// assets
import Search from "../assets/images/search.png";

function Input(props) {
  const {
    label,
    type,
    placeholder,
    defaultValue,
    _onClick,
    _onChange,
    _onBlur,
    _onKeyDown,
    _onKeyUp,
    _maxLength,
    border,
    radius,
    borderBottom,
    borderColor,
    borderBottomColor,
    margin,
    width,
    height,
    padding,
    is_flex,
    nav_input,
    upload_input,
    children,
    font_size,
    text_align,
    color,
    margin_top,
    margin_bottom,
    width_screen,
  } = props;
  const styles = {
    width,
    width_screen,
    height,
    border,
    radius,
    borderBottom,
    borderColor,
    borderBottomColor,
    margin,
    margin_top,
    margin_bottom,
    padding,
    is_flex,
    font_size,
    text_align,
    color,
  };
  if (nav_input) {
    return (
      <NavInputContainer>
        <NavInputField
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={_onChange}
          onBlur={_onBlur}
          {...styles}
          onKeyUp={_onKeyUp}
        />
        <img
          className="search"
          src={Search}
          alt="search-icon"
          onClick={_onClick}
        />
      </NavInputContainer>
    );
  }
  if (upload_input) {
    return (
      <UploadContainer>
        <div className="input-container">
          <LabelText>{label}</LabelText>
          <UploadInputField
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={_onChange}
            onBlur={_onBlur}
            onKeyDown={_onKeyDown}
            {...styles}
          />
        </div>
        <div className="children-container">
          <span>{children}</span>
        </div>
      </UploadContainer>
    );
  }
  return (
    <label>
      <LabelText margin_bottom={margin_bottom} margin_top={margin_top}>
        {label}
      </LabelText>
      <InputField
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={_onChange}
        onBlur={_onBlur}
        maxLength={_maxLength}
        onKeyUp={_onKeyUp}
        {...styles}
      />
    </label>
  );
}

Input.defaultProps = {
  border: `1px solid ${greyColor}`,
  type: "text",
  is_flex: false,
  _onChange: () => {},
  _onBlur: () => {},
};

const LabelText = styled.p`
  text-align: left;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: ${(props) => props.margin_bottom || "10px"};
  margin-top: ${(props) => props.margin_top || "16px"};
  color: ${darkGreyColor};
`;

const InputField = styled.input`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "54px"};
  border: 1px solid ${greyColor};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || "17px"};
  box-sizing: border-box;
  border-radius: ${(props) => props.radius || "5px"};
  font-size: ${(props) => props.font_size || "16px"};
  color: ${(props) => props.color};
  text-align: ${(props) => props.text_align};
  ${(props) =>
    props.is_flex
      ? `display: flex; flex-direction: row-reverse; justify-content: center; align-items: center;`
      : ""}
  @media screen and (max-width:1300px) {
    width: ${(props) => props.width_screen};
  }
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.borderColor || mainColor};
    border-bottom: 1px solid ${(props) => props.borderBottomColor || mainColor};
  }
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: flex-end;
  .children-container {
    width: 54px;
    height: 54px;
    text-align: center;
    background-color: ${greyColor};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    span {
      color: ${whiteColor};
      text-align: center;
      line-height: 52px;
    }
  }
`;

const UploadInputField = styled.input`
  width: 166px;
  height: 54px;
  border: 1px solid ${greyColor};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 17px;
  &:focus {
    outline: none;
  }
`;

const NavInputContainer = styled.div`
  position: relative;
  width: 400px;
  img {
    cursor: pointer;
  }
  .search {
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

const NavInputField = styled.input`
  width: 400px;
  height: 46px;
  border: 2px solid ${mainColor};
  border-radius: 50px;
  padding: 13px 22px;
  font-size: 16px;
  line-height: 20.03px;
  &:focus {
    outline: none;
  }
`;

export default Input;
