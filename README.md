# 🍻 주류 스마트 오더 & 소비활동 데이터 수집 서비스


주류 스마트오더 & 소비활동 데이터 수집 서비스는 주류 박람회에서 소비자들이 편리하게 주류 상품을 주문할 수 닜고, 그에 따른 주류 소비 활동 데이터를 수집하는 서비스입니다. 소비자들은 이 웹서비스를 통해 박람회의 주류 상품 목록, 상품정보를 확인하여 구매하고자 하는 상품들을 주문할 수 있습니다. 결제 절차 없이 주문 후 발급되는 주문번호를 통해 부스에서 빠르게 결제 및 상품픽업이 가능합니다. 팡매자는 판매 상품 등록, 수정과 함께 부스의 주문 내역을 확인하여 주문 상품을 전달하고, 픽업 완료 처리로 편리한 상품 판매 관리가 가능합니다. 소비자들의 연령, 성별, 지역 정보 등을 바탕으로 카테고리에 따른 주류 소비 데이터를 수집할 수 있습니다.

</br>

## 팀원
경제학과 2017110922 이상민</br>
컴퓨터공학전공 2019112587 김지현</br>
정보통신학전공 2019112132 박수련</br>
컴퓨터공학전공 2019111991 안도영</br>

</br>

## ⚙️ 기술 스택

<br />

<div align=center>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
</div>

<br />

## 💡 주요기능

## 메인페이지
- 무한스크롤
- 슬라이드 배너
  
### 구매자
- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 장바구니 페이지
- 주문/결제 페이지
- 검색 기능
  
### 판매자
- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 판매자 센터 페이지
- 상품 등록 페이지

<br/>

## 회원가입

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-761d58b725.gif"
            width="500px;"
            alt=""
          /><br/><sub><b>구매자 회원가입</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-ca981fb945.gif"
            width="500px;"
            alt=""
          /><br /><sub><b>판매자 회원가입</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 구매자, 판매자별로 나누어 회원가입이 가능합니다.
- 구매자의 경우 소비활동 데이터 수집을 위해 상별, 나이 등의 개인정보를 입력합니다.
- 판매자의 경우 부스 운영을 위한 부스명을 입력합니다.

<br />

## 로그인


<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im4.ezgif.com/tmp/ezgif-4-bbd643920d.gif"
            alt=""
          /><br /><sub><b>로그인</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 회원가입과 마찬가지로 구매자, 판매자별로 나누어져 있으며, 회원가입 시 입력한 아이디와 비밀번호로 로그인합니다.
- 로그인 후에 장바구니, 주문, 상품등록, 상품정보 수정 등의 기능을 기용 가능합니다.

<br />

## 메인페이지(무한스크롤)

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-49c88dd523.gif"
            alt=""
          /><br /><sub><b>메인페이지(무한스크롤)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 처음 15개 상품 데이터를 보여주고 15개 상품의 끝까지 스크롤을 내리면 15개의 상품을 추가로 생성해서 보여줍니다.

<br />

## 메인페이지(슬라이드 배너)

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-457fbf6047.gif"
            alt=""
          /><br /><sub><b>메인페이지(배너)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 현재 행사중이거나 홍보중인 제품들을 메인페이지 맨 첫 화면에서 확인할 수 있습니다.
- 일정 시간마다 다음 카드로 넘어가며, 수동 조작도 가능합니다.

<br />

## 검색 기능

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-78e85c9023.gif"
            alt=""
          /><br /><sub><b>검색 기능</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 상단 네비게이션바의 검색창을 통해 키워드로 상품 검색을 할 수 있습니다.

<br />


## 상품 상세 페이지 & 판매자 센터

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://im4.ezgif.com/tmp/ezgif-4-0939294cf9.gif"
            width="500px;"
            alt=""
          /><br/><sub><b>상세페이지(판매자 계정)</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-e593a989de.gif"
            width="500px;"
            alt=""
          /><br /><sub><b>상세페이지(구매자 계정)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 상품목록에서 특정 상품을 클릭하명 해당 상품의 상세페이지로 이동합니다.
- 로그인하면 상품을 장바구니에 추가하거나 바로구매가 가능합니다.
- 판매자 계정으로 로그인 한 경우에는 바로구매와 장바구니 버튼이 비활성화 됩니다.

<br />

## 상품등록

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im5.ezgif.com/tmp/ezgif-5-893d1dff2e.gif"
            alt=""
          /><br /><sub><b>상품등록(판매자 계정)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- **상품등록은 판매자 계정으로 로그인 했을 경우에만 가능합니다**.
- 이미지 영역에서 **첨부 아이콘을 클릭**하고 등록할 상품의 이미지를 선택하면 **상품의 이미지가 미리보기로 나타납니다**.
- 나머지 정보들(상품명,판매가,재고)도 입력 후 저장하기 버튼을 통해 새 판매 상품을 등록할 수 있습니다.

<br />

## 장바구니 페이지

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im2.ezgif.com/tmp/ezgif-2-467e731136.gif"
            alt=""
          /><br /><sub><b>장바구니페이지</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 장바구니에 담은 상품들 목록 및 정보(상품명, 수량)을 확인 가능하며 전체 상품 또는 원하느 상품만 선택하여 주문할 수 있습니다.

<br />

## 주문 페이지

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://im5.ezgif.com/tmp/ezgif-5-e724a1eb2a.gif"
            alt=""
          />
      </td>
    </tr>
  </table>
</div>

- 이름, 전화번호 등의 정보를 입력 후 정보 제공 방침에 동의하면 주문 버튼이 활성화됩니다.
- 주문을 완료하면 주문 번호와 함께 상품을 수령할 수 있는 부스 번호가 표시됩니다.
  
<br />
