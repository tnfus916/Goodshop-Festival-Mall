import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addProductDB, modifyProductDB } from "../redux/modules/product";
//components
import Nav from "../components/Nav";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Footer from "../components/Footer";
//assets
import UploadIcon from "../assets/images/icon-img.svg";
import UploadBg from "../assets/images/product-basic-img.png";
//elements
import { comma, unComma } from "../elements/Comma";

function Upload() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInput = useRef(null);
  const image = useRef(null);
  const isId = id ? true : false;
  const sellerItem = useSelector((state) => state.product.sellerProducts);
  const modifyItem = sellerItem.filter((s) => s.product_id === Number(id));
  const token = localStorage.getItem("token");

  const [productName, setProductName] = useState(
    isId ? modifyItem[0].product_name : ""
  );
  const [productPrice, setProductPrice] = useState(
    isId ? modifyItem[0].price : ""
  );
  const [attachment, setAttachment] = useState(isId ? modifyItem[0].image : "");
  const [encodImage, setEncodImage] = useState("");
  const [shippingCheck, setShippingCheck] = useState(
    isId ? (modifyItem[0].shipping_method === "DELIVERY" ? false : true) : false
  );
  const [shippingFee, setShippingFee] = useState(
    isId ? modifyItem[0].shipping_fee : ""
  );
  const [productStock, setProductStock] = useState(
    isId ? modifyItem[0].stock : ""
  );

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  const isNumValid = (num) => {
    const reg = /[0-9]/g;
    const isValid = reg.test(num);
    return isValid;
  };

  const handlePrice = (e) => {
    const price = e.target.value;
    if (e.target.value === "") {
      e.target.value = "";
    } else if (!isNumValid(price)) {
      e.target.value = "";
    } else {
      e.target.value = comma(price);
    }
    setProductPrice(unComma(price));
  };

  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    setEncodImage(theFile);
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  const deliveryCheck = () => {
    setShippingCheck(false);
  };

  const parcelCheck = () => {
    setShippingCheck(true);
  };

  const handleShippingFee = (e) => {
    const shippingPrice = e.target.value;
    if (e.target.value === "") {
      e.target.value = "";
    } else if (!isNumValid(shippingPrice)) {
      e.target.value = "";
    } else {
      e.target.value = comma(shippingPrice);
    }
    setShippingFee(unComma(shippingPrice));
  };

  const handleStock = (e) => {
    setProductStock(e.target.value);
    if (!isNumValid(e.target.value)) {
      e.target.value = "";
    }
  };

  const handleUpload = () => {
    const file = fileInput.current.files[0];
    const formData = new FormData();

    formData.append("product_name", productName);
    formData.append("image", file);
    formData.append("price", productPrice);
    formData.append("shipping_method", shippingCheck ? "PARCEL" : "DELIVERY");
    formData.append("shipping_fee", shippingFee);
    formData.append("stock", productStock);
    formData.append("product_info", `${productName} 입니다.`);
    formData.append("token", token);

    dispatch(addProductDB(formData));
  };

  const handleModify = () => {
    const file = fileInput.current.files[0];
    const formData = new FormData();

    formData.append("product_name", productName);
    formData.append("image", file);
    formData.append("price", productPrice);
    formData.append("shipping_method", shippingCheck ? "PARCEL" : "DELIVERY");
    formData.append("shipping_fee", shippingFee);
    formData.append("stock", productStock);
    formData.append("product_info", `${productName} 입니다.`);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(modifyProductDB(modifyItem[0].product_id, formData));
  };

  return (
    <div>
      <Nav seller_nav />
      <MainSection>
        <h1>상품등록</h1>
        <div className="section-container">
          <SectionOne>
            <p className="caution-sentence">*상품 등록 주의사항</p>
            <div className="caution-contents">
              <p>사전에 협의되지 않은 주류를 등록하면 계약 상의 위반으로 간주될 수 있습니다.</p>
            </div>
          </SectionOne>
          <SectionTwo>
            <div className="top-container">
              <div style={{ position: "relative", marginRight: "40px" }}>
                <p
                  style={{
                    color: "#767676",
                    marginBottom: "10px",
                    lineHeight: "20.03px",
                  }}
                >
                  상품 이미지
                </p>
                <img
                  className="upload-img"
                  src={attachment ? attachment : UploadBg}
                  alt="업로드 할 이미지"
                  ref={image}
                />
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInput}
                    onChange={selectImg}
                  />
                  <img
                    src={UploadIcon}
                    alt=""
                    style={{
                      position: "absolute",
                      top: "202px",
                      left: "202px",
                    }}
                  />
                </label>
              </div>
              <div className="container-input">
                <Input
                  height="54px"
                  label="상품명"
                  defaultValue={productName}
                  _maxLength="20"
                  borderColor="#C4C4C4"
                  borderBottomColor="#C4C4C4"
                  _onChange={handleProductName}
                />
                <p className="product-name_length">
                  {isId
                    ? `${modifyItem[0].product_name.length}/20`
                    : `${productName.length}/20`}
                </p>
                <Input
                  upload_input
                  label="판매가"
                  defaultValue={productPrice.toLocaleString()}
                  children="원"
                  _onChange={handlePrice}
                />

                <Input
                  upload_input
                  label="재고"
                  defaultValue={productStock}
                  children="개"
                  _onChange={handleStock}
                />
              </div>
            </div>
            <div className="bottom-container">
              <p className="product-detail">상품 상세정보</p>
              <div className="editor-section">
                <p>에디터영역</p>
              </div>
            </div>
          </SectionTwo>
        </div>
        <ButtonContainer>
          <Button
            width="200px"
            font_size="18px"
            height="60px"
            bg="#FFFF"
            color="#767676"
            border="1px solid #c4c4c4"
            hover_color="black"
            hover_border="1px solid #767676"
          >
            취소
          </Button>
          {isId ? (
            <Button
              width="200px"
              font_size="18px"
              height="60px"
              margin="0 0 0 14px"
              _onClick={handleModify}
            >
              수정하기
            </Button>
          ) : (
            <Button
              width="200px"
              font_size="18px"
              height="60px"
              margin="0 0 0 14px"
              _onClick={handleUpload}
            >
              저장하기
            </Button>
          )}
        </ButtonContainer>
      </MainSection>
      <Footer />
    </div>
  );
}

const MainSection = styled.div`
  padding: 38px 100px 96px;
  h1 {
    font-size: 36px;
  }
  .section-container {
    display: flex;
  }
`;
const SectionOne = styled.div`
  margin-right: 80px;
  .caution-sentence {
    color: #eb5757;
    margin-bottom: 10px;
  }
  .caution-contents {
    width: 320px;
    padding: 20px 20px 5px 20px;
    background-color: #ffefe8;
    display: flex;
    flex-direction: column;
    p {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 15px;
    }
  }
`;

const SectionTwo = styled.div`
  .top-container {
    display: flex;
    .upload-img {
      width: 454px;
      height: 454px;
    }
    .container-input {
      position: relative;
      width: 826px;
      margin-top: -20px;
      input {
        font-size: 16px;
      }
      .product-name_length {
        position: absolute;
        top: 63px;
        right: 17px;
        font-size: 14px;
        color: #c4c4c4;
      }
    }
  }
  .bottom-container {
    .product-detail {
      margin: 40px 0 10px 0;
      color: #767676;
    }
    .editor-section {
      width: 100%;
      height: 700px;
      background-color: #f2f2f2;
      border: 1px solid #c4c4c4;
      p {
        font-size: 48px;
        color: #c4c4c4;
        text-align: center;
        margin-top: 350px;
      }
    }
  }
`;
const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
`;

export default Upload;
