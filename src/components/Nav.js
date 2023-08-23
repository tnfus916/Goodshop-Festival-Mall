import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../shared/api";
import styled from "styled-components";
// elements
import Button from "../elements/Button";
import Input from "../elements/Input";
// assets
import UserIcon from "../assets/images/user.png";
import Cart from "../assets/images/shopping-cart.png";
import ShoppingIcon from "../assets/images/icon-shopping-bag.svg";
import LogoutIcon from "../assets/images/logout.png";
import LoginIcon from "../assets/images/login.png";

import { mainColor, darkGreyColor } from "../assets/GlobalStyle";

function Nav(props) {
  const { seller_nav, user_nav } = props;

  const isLogin = localStorage.getItem("token");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState();

  const onClickLogo = () => {
    navigate(`/`);
  };

  const handleLogOut = () => {
    apis
      .signOut()
      .then((res) => {
        localStorage.clear();
        window.location.assign("/");
      })
      .catch((error) => {
        console.log("로그아웃에러", error);
      });
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      console.log(e);
    }
  };

  const handleSearch = (e) => {
    navigate(`/search?query=${search}`, {
      state: {
        search,
      },
    });
  };

  if (seller_nav) {
    return (
      <SellerNavigation>
        <Logo onClick={onClickLogo}>GoodShop</Logo>
        <h1>판매자 센터</h1>
      </SellerNavigation>
    );
  }
  if (user_nav) {
    return (
      <Navigation>
        <div>
          <Logo onClick={onClickLogo}>GoodShop</Logo>
          <Input
            nav_input
            placeholder="검색어를 입력해주세요"
            defaultValue={props.search}
            _onChange={(e) => setSearch(e.target.value)}
            _onClick={handleSearch}
            _onKeyUp={(e) => handleSearchEnter(e)}
          />
        </div>
        <div>
          <div className="navigate-cart" onClick={() => navigate("/cart")}>
            <img src={Cart} alt="mypage-button" />
            {/* <p style={{ color: `${color}` }}>장바구니</p> */}
            <p>장바구니</p>
          </div>
          {isLogin ? (
            <div className="my-page" onClick={() => navigate("/mypage")}>
              <img src={UserIcon} alt="mypage-button" />
              <p>마이페이지</p>
            </div>
          ) : (
            <div className="my-page" onClick={() => navigate("/signup")}>
              <img src={UserIcon} alt="mypage-button" />
              <p>회원가입</p>
            </div>
          )}
          {isLogin ? (
            <div className="my-page" onClick={() => handleLogOut()}>
              <img src={LogoutIcon} alt="mypage-button" />
              <p>로그아웃</p>
            </div>
          ) : (
            <div className="my-page" onClick={() => navigate("/login")}>
              <img src={LoginIcon} alt="mypage-button" />
              <p>로그인</p>
            </div>
          )}
        </div>
      </Navigation>
    );
  }
  return (
    <Navigation>
      <div className="container-search">
        <Logo onClick={onClickLogo}>GoodShop</Logo>
        <Input
          nav_input
          placeholder="검색어를 입력해주세요"
          defaultValue={props.search}
          _onChange={(e) => setSearch(e.target.value)}
          _onClick={handleSearch}
        />
      </div>
      <div className="container-userIcon">
        {isLogin ? (
          <div className="my-page" onClick={() => handleLogOut()}>
            <img src={LogoutIcon} alt="mypage-button" />
            <p>로그아웃</p>
          </div>
        ) : (
          <div className="my-page" onClick={() => navigate("/login")}>
            <img src={LoginIcon} alt="mypage-button" />
            <p>로그인</p>
          </div>
        )}
        <Button
          src={ShoppingIcon}
          seller_nav_button
          _onClick={() => navigate("/seller-center")}
        >
          판매자센터
        </Button>
      </div>
    </Navigation>
  );
}

const Navigation = styled.nav`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 320px;
  box-shadow: 0px 4px 5px 0px #0000001a;
  @media screen and (max-width: 1500px) {
    padding: 22px 30px;
  }
  div {
    display: flex;
    align-items: center;
  }
  h1 {
    margin-right: 30px;
    cursor: pointer;
  }
  .navigate-cart {
    display: flex;
    flex-direction: column;
    margin-right: 26px;
    cursor: pointer;
  }
  a,
  .my-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    cursor: pointer;
  }
  p {
    font-size: 12px;
    color: ${darkGreyColor};
    margin-top: 4px;
  }
  .container-userIcon {
    position: relative;
    .seller-mypage {
      display: flex;
      flex-direction: column;
      margin-right: 30px;
      cursor: pointer;
    }
  }
`;

const SellerNavigation = styled.nav`
  width: 100%;
  height: 120px;
  box-shadow: 0px 4px 5px 0px #0000001a;
  padding: 26px 100px;
  display: flex;
  align-items: center;
  flex-direction: row;
  div {
    cursor: pointer;
  }
  img {
    margin-right: 16px;
  }
  h1 {
    font-size: 30px;
    font-weight: 500;
    line-height: 37.56px;
  }
`;
const Logo = styled.button`
  font-size: 40px;
  font-weight: 700;
  color: ${mainColor};
  margin-right: 15px;
`;

export default Nav;
