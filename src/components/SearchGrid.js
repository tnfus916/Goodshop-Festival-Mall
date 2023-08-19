import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SearchGrid({ searchList }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate("/detail/e.target.id");
  };
  return (
    <Container>
      {searchList.map((p) => {
        return (
          <div key={p.product_id} onClick={onClick}>
            <img src={p.image} alt="" />
            <p className="product-name">{p.store_name}</p>
            <p className="product">{p.product_name}</p>
            <span className="product-price">{p.price.toLocaleString()}</span>
            <span>원</span>
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 380px);
  justify-content: center;
  gap: 70px;
  padding: 80px 0 180px;
  @media screen and (max-width: 1300px) {
    grid-template-columns: repeat(2, 380px);
  }
  @media screen and (max-width: 932px) {
    grid-template-columns: repeat(1, 380px);
  }
  div {
    cursor: pointer;
  }
  img {
    margin-bottom: 16px;
    width: 380px;
    height: 380px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }
  .product-name {
    font-size: 16px;
    color: #767676;
  }
  .product {
    font-size: 18px;
    margin: 10px 0;
  }
  .product-price {
    font-size: 24px;
    font-weight: bold;
  }
`;
export default SearchGrid;
