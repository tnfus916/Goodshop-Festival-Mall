import React from "react";
import styled from "styled-components";
// assets
import Insta from "../assets/images/icon-insta.svg";
import Fbook from "../assets/images/icon-fb.svg";
import Ytube from "../assets/images/icon-yt.svg";

function Footer() {
  return (
    <FooterContainer>
      <TopContainer>
        <div>
          <ul>
            <li>굿샵 소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>전자금융거래약관</li>
            <li>청소년보호정책</li>
            <li>제휴문의</li>
          </ul>
          <div>
            <img src={Insta} alt="" />
            <img src={Fbook} alt="" />
            <img src={Ytube} alt="" />
          </div>
        </div>
      </TopContainer>
      <BottomContainer>
        <p>(주) GOODSHOP</p>
        <p>인천광역시 길주로 623 대덕리치아노 101-607</p>
        <p>사업자번호: 000-0000-0000 | 통신판매업</p>
        <p>대표: 정용희</p>
      </BottomContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 298px;
  background-color: #f2f2f2;
  padding: 60px 100px 63px;
  @media screen and (max-width: 1320px) {
    padding: 50px 90px 43px;
  }
`;
const TopContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 30px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      li {
        font-size: 14px;
      }
      li:nth-child(-n + 5)::after {
        display: inline-block;
        content: "";
        width: 1px;
        height: 14px;
        background-color: black;
        vertical-align: middle;
        margin: 0 14px;
      }
    }
  }
  img {
    margin-left: 14px;
  }
`;

const BottomContainer = styled.div`
  margin-top: 30px;
  p {
    font-size: 14px;
    color: #767676;
    line-height: 24px;
    &:first-child {
      font-weight: bold;
    }
  }
`;

export default Footer;
