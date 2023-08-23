import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductDB } from "../redux/modules/product";
import styled from "styled-components";
import UserModal from "./UserModal";
import Button from "../elements/Button";
import { greyColor, lightMainColor } from "../assets/GlobalStyle";

function SellerCenterItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(0);

  const onClickOrderComplete = (e) => {
    //button disable
    e.target.disabled = true;
    //button color change
    e.target.style.backgroundColor = greyColor;
    e.target.style.color = "#fff";

    // change tmp element text
    const tmp = document.getElementById("tmp");
    tmp.innerText = "결제 완료";
  };

  return (
    <>
      <Item>
        {/* <div className='basic-info'>
                <img className="product-img" src={props.image} alt="" onClick={() => navigate(`/detail/${props.product_id}`)} />
                <div>
                    <p>{props.product_name}</p>
                    <p>재고: {props.stock}개</p>
                </div>
            </div> */}
        <div> 230822120</div>
        <div>결제 완료 </div>
        <div className="price-info">&nbsp;&nbsp;&nbsp;9,000원</div>
        <div className="btn-container">
          <Button
            width="80px"
            height="40px"
            _disabled={true}
            _onClick={() => navigate(`/edit/${props.product_id}`)}
          >
            결제완료
          </Button>
          {/* <Button
          width="80px"
          height="40px"
          bg="#FFFF"
          color="#767676"
          border="1px solid #c4c4c4"
          hover_color="black"
          hover_border="1px solid #767676"
          _onClick={() => setModal(1)}
        >
          삭제
        </Button> */}
        </div>
        {modal === 1 && (
          <UserModal
            modal_to_check
            _disabled={true}
            children2="주문 결제 완료처리하시겠습니까?"
            btn_children_1="취소"
            btn_children_2="확인"
            margin="40px 0 0 0"
            _onClick={() => setModal(0)}
            _onClick2={() => {
              dispatch(deleteProductDB(props.product_id));
              setModal(0);
            }}
            _onClickBg={() => setModal(0)}
          />
        )}
      </Item>
      <Item>
        {/* <div className='basic-info'>
              <img className="product-img" src={props.image} alt="" onClick={() => navigate(`/detail/${props.product_id}`)} />
              <div>
                  <p>{props.product_name}</p>
                  <p>재고: {props.stock}개</p>
              </div>
          </div> */}
        <div> 230822011</div>
        <div id="tmp">픽업 대기중</div>
        <div className="price-info">{props.price.toLocaleString()}원</div>
        <div className="btn-container">
          <Button width="80px" height="40px" _onClick={onClickOrderComplete}>
            결제완료
          </Button>
          {/* <Button
        width="80px"
        height="40px"
        bg="#FFFF"
        color="#767676"
        border="1px solid #c4c4c4"
        hover_color="black"
        hover_border="1px solid #767676"
        _onClick={() => setModal(1)}
      >
        삭제
      </Button> */}
        </div>
        {modal === 1 && (
          <UserModal
            modal_to_check
            _disabled={true}
            children2="주문 결제 완료처리하시겠습니까?"
            btn_children_1="취소"
            btn_children_2="확인"
            margin="40px 0 0 0"
            _onClick={() => setModal(0)}
            _onClick2={() => {
              dispatch(deleteProductDB(props.product_id));
              setModal(0);
            }}
            _onClickBg={() => setModal(0)}
          />
        )}
      </Item>
    </>
  );
}

const Item = styled.div`
  width: 100%;
  height: 103px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #c4c4c4;
  background-color: #ffff;
  align-items: center;
  .product-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #c4c4c4;
    margin-right: 30px;
    cursor: pointer;
  }
  /* .basic-info {
    display: flex;
    width: 50%;
    padding-left: 30px;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    p {
      &:first-child {
        font-size: 18px;
        margin-bottom: 10px;
      }
      &:nth-child(2) {
        color: #767676;
      }
    }
  } */
  /* .price-info {
    width: 30%;
    text-align: center;
    font-size: 18px;
  } */
  /* .btn-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  } */
`;

export default SellerCenterItem;
