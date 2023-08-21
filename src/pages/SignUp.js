import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apis } from "../shared/api";
import { sellerSignUpDB, signUpDB } from "../redux/modules/user";
import styled from "styled-components";
// elements
import Input from "../elements/Input";
import Button from "../elements/Button";
import Tab from "../elements/Tab";
//assets
import pwCheckOn from "../assets/images/check-on.png";
import pwCheckOff from "../assets/images/check-off.png";

import { greyColor, mainColor, redColor } from "../assets/GlobalStyle";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [checkBox, setCheckBox] = useState(false);

  // 구매 회원가입 정보 저장
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  // 판매 회원가입 정보 저장
  const [sellerPw, setSellerPw] = useState("");
  const [sellerPw2, setSellerPw2] = useState("");
  const [boothNum, setBoothNum] = useState("");

  //중복확인 체크
  const [isCheck, setIsCheck] = useState(false);

  // 구매자 계정 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [phoneNumMessage, setPhoneNumMessage] = useState("");

  // 판매자 계정 에러 메세지
  const [salesPwMessage, setSalesPwMessage] = useState("");
  const [salesPw2Message, setSalesPw2Message] = useState("");
  const [salesBoothNumMessage, setSalesBoothNumMessage] = useState("");

  // 구매자 계정 유효성 검사
  const [isPw, setIsPw] = useState();
  const [isPw2, setIsPw2] = useState();
  const [isId, setIsId] = useState();
  const [isName, setIsName] = useState();
  const [isGender, setIsGender] = useState();
  const [isBirth, setIsBirth] = useState();
  const [isPhoneNum, setIsPhoneNum] = useState();

  // 판매자 계정 유효성 검사
  const [salesIsPw, setSalesIsPw] = useState();
  const [salesIsPw2, setSalesIsPw2] = useState();
  const [salesIsBoothNum, setSalesIsBoothNum] = useState();

  const onClickLogo = () => {
    navigate(`/`);
  };

  // Id 유효성 검사
  const idCheck = (e) => {
    setId(e.target.value);
    const regId = /^[a-zA-Z][0-9a-zA-Z]{0,19}$/;
    if (!regId.test(e.target.value)) {
      setIdMessage("20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.");
      setIsId(false);
    } else if (e.target.value === "") {
      setIdMessage("필수 정보입니다");
      setIsId(false);
    } else {
      setIdMessage("");
      setIsId(true);
    }
  };

  //ID중복검사 체크
  const dupCheck = () => {
    const signUpData = {
      username: id,
    };
    apis
      .dupcheck(signUpData)
      .then((res) => {
        setIdMessage(res.data.Success); //setIdMessage("사용 가능한 아이디입니다.");
      })
      .catch((error) => {
        setIdMessage(error.response.data.FAIL_Message);
        setIsId(false);
      });
    setIsCheck(true);
  };

  // ID Input focus out 했을시 빈칸일때
  const idBlankCheck = () => {
    if (id === "") {
      setIdMessage("필수 정보입니다");
      setIsId(false);
    }
  };

  // 비밀번호 유효성 검사
  const pwCheck = (e) => {
    setPw(e.target.value);
    setSellerPw(e.target.value);
    const regPw =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;

    if (tab === 0) {
      if (e.target.value === "") {
        setPwMessage("필수 정보입니다");
        setIsPw(false);
      } else if (!regPw.test(e.target.value)) {
        setPwMessage("8자 이상, 영문 대 소문자,숫자,특수문자를 사용하세요.");
        setIsPw(false);
      } else {
        setPwMessage("");
        setIsPw(true);
      }
    } else if (tab === 1) {
      if (e.target.value === "") {
        setSalesPwMessage("필수 정보입니다");
        setSalesIsPw(false);
      } else if (!regPw.test(sellerPw)) {
        setSalesPwMessage("8자 이상 영문, 숫자 조합으로 입력해주세요");
        setSalesIsPw(false);
      } else {
        setSalesPwMessage("올바른 비밀번호 입니다.");
        setSalesIsPw(true);
      }
    }
  };

  // Pw Input focus out 했을시 빈칸일때
  const pwBlankCheck = () => {
    if (tab === 0) {
      if (pw === "") {
        setPwMessage("필수 정보입니다");
        setIsPw(false);
      }
    } else if (tab === 1) {
      if (sellerPw === "") {
        setSalesPwMessage("필수 정보입니다");
        setSalesIsPw(false);
      }
    }
  };

  // 비밀번호 확인 유효성 검사
  const isSamePw = (e) => {
    setPw2(e.target.value);
    setSellerPw2(e.target.value);
    if (tab === 0) {
      if (pw === e.target.value) {
        setPw2Message("비밀번호가 일치합니다.");
        setIsPw2(true);
      } else if ((pw === "") === e.target.value) {
        setPw2Message("필수 정보입니다");
        setIsPw(false);
      } else if (e.target.value === "") {
        setPw2Message("필수 정보입니다");
        setIsPw2(false);
      } else {
        setPw2Message("비밀번호가 일치하지 않습니다");
        setIsPw2(false);
      }
    } else if (tab === 1) {
      if (sellerPw === e.target.value) {
        setSalesPw2Message("비밀번호가 일치합니다.");
        setSalesIsPw2(true);
      } else if ((sellerPw === "") === e.target.value) {
        setSalesPw2Message("필수 정보입니다");
        setSalesIsPw(false);
      } else if (e.target.value === "") {
        setSalesPw2Message("필수 정보 입니다");
        setSalesIsPw2(false);
      } else {
        setSalesPw2Message("비밀번호가 일치하지 않습니다");
        setSalesIsPw2(false);
      }
    }
  };

  // Pw2 Input focus out 했을시 빈칸일때
  const pw2BlankCheck = () => {
    if (tab === 0) {
      if (pw2 === "") {
        setPw2Message("필수 정보입니다");
        setIsPw2(false);
      }
    } else if (tab === 1) {
      if (sellerPw2 === "") {
        setSalesPw2Message("필수 정보입니다");
        setSalesIsPw2(false);
      }
    }
  };

  // Name Input focus out 했을시 빈칸일때
  const nameBlankCheck = () => {
    if (name === "") {
      setNameMessage("필수 정보입니다");
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  // Gender Input focus out 했을시 빈칸일때
  const genderBlankCheck = () => {
    if (gender === "") {
      setGenderMessage("필수 정보입니다");
      setIsGender(false);
    } else {
      setIsGender(true);
    }
  };

  // Birth Input focus out 했을시 빈칸일때
  const birthBlankCheck = () => {
    if (birth === "") {
      setBirthMessage("필수 정보입니다");
      setIsBirth(false);
    } else {
      setIsBirth(true);
    }
  };

  // Phone Input focus out 했을시 빈칸일때
  const phoneNumBlankCheck = () => {
    if (phoneNum === "") {
      setPhoneNumMessage("필수 정보입니다");
      setIsPhoneNum(false);
    } else {
      setIsPhoneNum(true);
    }
  };

  // Booth Num focus out 했을시 빈칸일때
  const boothNumBlankCheck = () => {
    if (boothNum === "") {
      setSalesBoothNumMessage("필수 정보입니다");
      setSalesIsBoothNum(false);
    }
  };

  // BoothNum 중복검사
  const isBoothNum = (e) => {
    setBoothNum(e.target.value);
    const boothNumData = {
      store_name: e.target.value,
    };
    apis
      .sellerSignUp(boothNumData)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.store_name ===
          "해당 부스의 계정이 이미 존재합니다."
        ) {
          setSalesBoothNumMessage("해당 부스의 계정이 이미 존재합니다.");
          setSalesIsBoothNum(false);
        } else if (
          error.response.data.store_name === "이 필드는 blank일 수 없습니다."
        ) {
          setSalesBoothNumMessage("필수 정보입니다.");
          setSalesIsBoothNum(false);
        } else {
          setSalesBoothNumMessage("계정 생성이 가능한 부스입니다.");
          setSalesIsBoothNum(true);
        }
      });
  };

  // 회원가입 버튼 활성화 검사
  const buttoncheck = () => {
    if (tab === 0) {
      if (
        !isId ||
        !isPw ||
        !isPw2 ||
        name === "" ||
        !isGender ||
        !isBirth ||
        phoneNum === "" ||
        !checkBox
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (!salesIsPw || !salesIsPw2 || !salesIsBoothNum || !checkBox) {
        return true;
      } else {
        return false;
      }
    }
  };

  // 동의 checkbox click 여부
  const handleCheck = () => {
    setCheckBox(!checkBox);
  };

  // 회원가입
  const handleSignUp = () => {
    if (tab === 0) {
      if (isCheck === false) {
        window.alert("아이디 중복확인을 해주세요.");
      }
      const signupData = {
        id: isCheck === true ? id : "",
        pwd: pw,
        name: name,
        gender: gender,
        age: 2024 - parseInt(birth) / 10000,
        phone_number: phoneNum,
      };
      dispatch(signUpDB(signupData));
    } else {
      const signupData = {
        pwd: sellerPw,
        booth_number: boothNum,
      };
      dispatch(sellerSignUpDB(signupData));
    }
  };

  return (
    <SignUpSection>
      <h1 style={{ margin: "70px 0 50px" }}>
        <Logo onClick={onClickLogo}>GoodShop</Logo>
      </h1>
      <Tab
        tab={tab}
        setTab={setTab}
        children="구매회원가입"
        children2="판매회원가입"
      />
      <SignUpForm>
        {tab === 0 && (
          <ul className="normal-form_wrap">
            <li className="normal-user">
              <div className="id-container">
                <Input
                  width="246px"
                  height="44px"
                  label="아이디"
                  margin="0 12px 0 0"
                  _onChange={idCheck}
                  _onBlur={idBlankCheck}
                  borderColor={id.length >= 0 && (isId ? mainColor : redColor)}
                  borderBottomColor={
                    id.length >= 0 && (isId ? mainColor : redColor)
                  }
                />
                <Button
                  height="44px"
                  align="end"
                  width="122px"
                  _onClick={dupCheck}
                >
                  중복확인
                </Button>
              </div>
              {id.length >= 0 && (
                <>
                  <Message className={`${isId ? "success" : "error"}`}>
                    {idMessage}
                  </Message>
                </>
              )}
              <Input
                type="password"
                label="비밀번호"
                height="44px"
                _onChange={pwCheck}
                _onBlur={pwBlankCheck}
                borderColor={pw.length >= 0 && (isPw ? mainColor : redColor)}
                borderBottomColor={
                  pw.length >= 0 && (isPw ? mainColor : redColor)
                }
              />
              <div className="pw-check">
                {!isPw ? (
                  <img src={pwCheckOff} alt="" />
                ) : (
                  <img src={pwCheckOn} alt="" />
                )}
              </div>
              {pw.length >= 0 && (
                <>
                  <Message className={`${isPw ? "success" : "error"}`}>
                    {pwMessage}
                  </Message>
                </>
              )}
              <Input
                type="password"
                label="비밀번호 재확인"
                height="44px"
                _onChange={isSamePw}
                _onBlur={pw2BlankCheck}
                borderColor={pw2.length >= 0 && (isPw2 ? mainColor : redColor)}
                borderBottomColor={
                  pw2.length >= 0 && (isPw2 ? mainColor : redColor)
                }
              />
              <div className="pw-check">
                {!isPw2 ? (
                  <img src={pwCheckOff} alt="" />
                ) : (
                  <img src={pwCheckOn} alt="" />
                )}
              </div>
              {pw2.length >= 0 && (
                <>
                  <Message className={`${isPw2 ? "success" : "error"}`}>
                    {pw2Message}
                  </Message>
                </>
              )}
              <Input
                label="이름"
                height="44px"
                _onChange={(e) => setName(e.target.value)}
                _onBlur={nameBlankCheck}
                borderColor={
                  name.length >= 0 && (isName ? mainColor : redColor)
                }
                borderBottomColor={
                  name.length >= 0 && (isName ? mainColor : redColor)
                }
              />
              {name.length >= 0 && (
                <>
                  <Message className={`${isName ? "success" : "error"}`}>
                    {nameMessage}
                  </Message>
                </>
              )}
              <Input
                label="생년월일(8자리)"
                height="44px"
                _onChange={(e) => setBirth(e.target.value)}
                _onBlur={birthBlankCheck}
                borderColor={
                  birth.length >= 0 && (isBirth ? mainColor : redColor)
                }
                borderBottomColor={
                  birth.length >= 0 && (isBirth ? mainColor : redColor)
                }
              />
              {birth.length >= 0 && (
                <>
                  <Message className={`${isBirth ? "success" : "error"}`}>
                    {birthMessage}
                  </Message>
                </>
              )}
              <Input
                label="성별(남/여)"
                height="44px"
                _onChange={(e) => setGender(e.target.value)}
                _onBlur={genderBlankCheck}
                borderColor={
                  gender.length >= 0 && (isGender ? mainColor : redColor)
                }
                borderBottomColor={
                  gender.length >= 0 && (isGender ? mainColor : redColor)
                }
              />
              {gender.length >= 0 && (
                <>
                  <Message className={`${isGender ? "success" : "error"}`}>
                    {genderMessage}
                  </Message>
                </>
              )}
              <Input
                label="전화번호( - 없이 입력)"
                height="44px"
                _onChange={(e) => setPhoneNum(e.target.value)}
                _onBlur={phoneNumBlankCheck}
                borderColor={
                  phoneNum.length >= 0 && (isPhoneNum ? mainColor : redColor)
                }
                borderBottomColor={
                  phoneNum.length >= 0 && (isPhoneNum ? mainColor : redColor)
                }
              />
              {phoneNum.length >= 0 && (
                <>
                  <Message className={`${isPhoneNum ? "success" : "error"}`}>
                    {phoneNumMessage}
                  </Message>
                </>
              )}
            </li>
          </ul>
        )}
        {tab === 1 && (
          <ul className="form-wrap">
            <li className="sales-user">
              <Input
                label="부스 번호"
                height="44px"
                _onChange={isBoothNum}
                _onBlur={boothNumBlankCheck}
                borderColor={
                  boothNum.length >= 0 &&
                  (salesIsBoothNum ? mainColor : redColor)
                }
                borderBottomColor={
                  boothNum.length >= 0 &&
                  (salesIsBoothNum ? mainColor : redColor)
                }
              />
              {boothNum.length >= 0 && (
                <>
                  <Message
                    className={`${salesIsBoothNum ? "success" : "error"}`}
                  >
                    {salesBoothNumMessage}
                  </Message>
                </>
              )}
              <Input
                label="비밀번호"
                type="password"
                height="44px"
                _onChange={pwCheck}
                _onBlur={pwBlankCheck}
                borderColor={
                  sellerPw.length >= 0 && (salesIsPw ? mainColor : redColor)
                }
                borderBottomColor={
                  sellerPw.length >= 0 && (salesIsPw ? mainColor : redColor)
                }
              />
              <div className="pw-check">
                {!salesIsPw ? (
                  <img src={pwCheckOff} alt="" />
                ) : (
                  <img src={pwCheckOn} alt="" />
                )}
              </div>
              {sellerPw.length >= 0 && (
                <>
                  <Message className={`${salesIsPw ? "success" : "error"}`}>
                    {salesPwMessage}
                  </Message>
                </>
              )}
              <Input
                label="비밀번호 재확인"
                type="password"
                height="44px"
                _onChange={isSamePw}
                _onBlur={pw2BlankCheck}
                borderColor={
                  sellerPw2.length >= 0 && (salesIsPw2 ? mainColor : redColor)
                }
                borderBottomColor={
                  sellerPw2.length >= 0 && (salesIsPw2 ? mainColor : redColor)
                }
              />
              <div className="pw-check">
                {!salesIsPw2 ? (
                  <img src={pwCheckOff} alt="" />
                ) : (
                  <img src={pwCheckOn} alt="" />
                )}
              </div>
              {sellerPw2.length >= 0 && (
                <>
                  <Message className={`${salesIsPw2 ? "success" : "error"}`}>
                    {salesPw2Message}
                  </Message>
                </>
              )}
            </li>
          </ul>
        )}
      </SignUpForm>
      <label className="checkbox-label">
        <input type="checkbox" onClick={handleCheck} />
        <p>
          굿샵의 이용약관 및 개인 정보처리 방침에 대한 내용을 확인하였고
          동의합니다.
        </p>
      </label>
      {tab === 0 ? (
        <Button
          width="380px"
          height="50px"
          margin="0px 0px 100px"
          font_size="17px"
          _disabled={buttoncheck()}
          _onClick={handleSignUp}
        >
          가입하기
        </Button>
      ) : (
        <Button
          width="380px"
          height="50px"
          margin="0px 0px 100px"
          font_size="17px"
          _disabled={buttoncheck()}
          _onClick={handleSignUp}
        >
          가입하기
        </Button>
      )}
    </SignUpSection>
  );
}

const SignUpSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    cursor: pointer;
  }
  .checkbox-label {
    display: flex;
    width: 380px;
    margin: 34px 0;
    input {
      align-self: baseline;
      margin-right: 10px;
    }
  }
`;

const SignUpForm = styled.div`
  width: 440px;
  box-sizing: border-box;
  border: 1px solid ${greyColor};
  border-top: none;
  .normal-form_wrap {
    padding: 40px 35px 36px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    li {
      .id-container {
        display: flex;
      }
      .pw-check {
        width: 28px;
        position: relative;
        img {
          position: absolute;
          bottom: 8px;
          left: 338px;
        }
      }
    }
  }
  .form-wrap {
    padding: 40px 35px 36px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    li {
      .id-container {
        display: flex;
      }
      .pw-check {
        width: 28px;
        position: relative;
        img {
          position: absolute;
          bottom: 8px;
          left: 200px;
        }
      }
    }
  }
  img.off {
    transform: rotate(180deg);
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

export default SignUp;
