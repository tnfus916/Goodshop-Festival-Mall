import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInDB } from "../redux/modules/user";
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Tab from "../elements/Tab";

import { mainColor, redColor } from "../assets/GlobalStyle";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [salesIdMessage, setSalesIdMessage] = useState("");
  const [salesPwMessage, setSalesPwMessage] = useState("");

  const onClickLogo = () => {
    navigate(`/`);
  };

  const handleLogin = () => {
    const loginData = {
      username: id,
      password: pw,
      login_type: tab === 0 ? "BUYER" : "SELLER",
    };
    if (tab === 0) {
      if (id === "") {
        setIdMessage("아이디를 입력해주세요");
      }
      if (pw === "") {
        setPwMessage("비밀번호를 입력해주세요");
      }
      dispatch(signInDB(loginData));
    } else if (tab === 1) {
      if (id === "") {
        setSalesIdMessage("아이디를 입력해주세요");
      }
      if (pw === "") {
        setSalesPwMessage("비밀번호를 입력해주세요");
      }
      dispatch(signInDB(loginData));
    }
  };

  const handleLoginEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
      console.log(e);
    }
  };
  return (
    <LoginSection>
      <h1 style={{ marginBottom: "70px" }}>
        <Logo onClick={onClickLogo}>GoodShop</Logo>
      </h1>
      <Tab tab={tab} setTab={setTab} children="고객용" children2="판매자용" />
      <LoginForm>
        {tab === 0 && (
          <ul className="login-wrap">
            <Input
              placeholder="아이디"
              height="44px"
              padding="none"
              border="none"
              radius="none"
              borderBottom="1px solid #c4c4c4"
              borderColor="transparent"
              _onChange={(e) => setId(e.target.value)}
            />
            {id.length >= 0 && (
              <>
                <Message>{idMessage}</Message>
              </>
            )}
            <Input
              type="password"
              placeholder="비밀번호"
              height="44px"
              padding="none"
              border="none"
              radius="none"
              borderBottom="1px solid #c4c4c4"
              borderColor="transparent"
              _onChange={(e) => setPw(e.target.value)}
              _onKeyUp={(e) => handleLoginEnter(e)}
            />
            {pw.length >= 0 && (
              <>
                <Message>{pwMessage}</Message>
              </>
            )}
            <Button
              height="50px"
              margin="52px 0 0"
              font_size="16px"
              font_weight="bold"
              _onClick={handleLogin}
            >
              로그인
            </Button>
          </ul>
        )}
        {tab === 1 && (
          <ul className="sales-login_wrap">
            <Input
              placeholder="아이디"
              height="44px"
              padding="none"
              border="none"
              radius="none"
              borderBottom="1px solid #c4c4c4"
              borderColor="transparent"
              _onChange={(e) => setId(e.target.value)}
            />
            {id.length >= 0 && (
              <>
                <Message>{salesIdMessage}</Message>
              </>
            )}
            <Input
              type="password"
              placeholder="비밀번호"
              height="44px"
              padding="none"
              border="none"
              radius="none"
              borderBottom="1px solid #c4c4c4"
              borderColor="transparent"
              _onChange={(e) => setPw(e.target.value)}
              _onKeyUp={(e) => handleLoginEnter(e)}
            />
            {pw.length >= 0 && (
              <>
                <Message>{salesPwMessage}</Message>
              </>
            )}
            <Button
              height="50px"
              margin="52px 0 0"
              font_size="16px"
              font_weight="bold"
              _onClick={handleLogin}
            >
              로그인
            </Button>
          </ul>
        )}
      </LoginForm>
      <div className="move-to_signup">
        <span onClick={() => navigate("/signup")}>회원가입 페이지로 이동</span>
      </div>
    </LoginSection>
  );
}

const LoginSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  h1 {
    cursor: pointer;
  }
  .move-to_signup {
    margin-top: 30px;
    border-bottom: 1px solid black;
    span {
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

const LoginForm = styled.div`
  width: 440px;
  box-sizing: border-box;
  border: 1px solid #c4c4c4;
  border-top: none;
  .login-wrap {
    padding: 34px 35px 36px;
  }
  .sales-login_wrap {
    padding: 34px 35px 36px;
  }
`;

const Message = styled.p`
  font-size: 13px;
  align-self: flex-start;
  margin-top: 10px;
  color: ${(props) => (props.className === "success" ? mainColor : redColor)};
`;

const Logo = styled.button`
  font-size: 50px;
  font-weight: 700;
  color: ${mainColor};
  margin-right: 15px;
`;
export default Login;
