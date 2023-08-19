import React, { useEffect, useState } from "react";
import styled from "styled-components";
// assets
import Vector1 from "../assets/images/Vector.png";
import Vector2 from "../assets/images/Vector2.png";
import banner1 from "../assets/images/sample1.png";
import banner2 from "../assets/images/sample2.png";
import banner3 from "../assets/images/sample3.png";

function Banner() {
  const bannerList = [banner1, banner2, banner3];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (slide !== bannerList.length - 1) {
        setSlide(slide + 1);
      } else {
        setSlide(0);
      }
    }, 5000);
    return () => {
      clearInterval(timer); // timer 함수를 clearInterval을하여 return 한다.
    };
  }, [slide]);

  const handleSlidePrev = () => {
    if (slide !== 0) {
      setSlide(slide - 1);
    } else {
      setSlide(bannerList.length - 1);
    }
  };

  const handleSlideNext = () => {
    if (slide !== bannerList.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  const moveSlide = (index) => {
    setSlide(index);
  };

  return (
    <BannerContainer>
      <SlideContainer>
        <img
          src={Vector1}
          className="swiper1"
          alt=""
          onClick={handleSlidePrev}
        />
        <Slide>
          {bannerList.map((b, i) => {
            return (
              <li
                key={i}
                className={slide === i ? "active" : ""}
                style={
                  slide === bannerList.length
                    ? { transform: "translateX(0px)" }
                    : { transform: `translateX(-${slide}00%)` }
                }
              >
                <img src={b} alt="" />
              </li>
            );
          })}
        </Slide>
        <img
          src={Vector2}
          className="swiper2"
          alt=""
          onClick={handleSlideNext}
        />
        <div className="dot-container">
          {bannerList.map((d, i) => {
            return (
              <div
                key={i}
                onClick={() => moveSlide(i)}
                className={`dot ${slide === i ? "on" : ""}`}
              ></div>
            );
          })}
        </div>
      </SlideContainer>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  width: 100%;
  padding: 40px 40px 0 40px;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  .swiper1 {
    z-index: 1;
    position: absolute;
    top: 280px;
    left: 100px;
    cursor: pointer;
  }
  .swiper2 {
    right: 100px;
    top: 280px;
    position: absolute;
    cursor: pointer;
  }
  .dot-container {
    position: absolute;
    width: 100%;
    display: flex;
    bottom: 25px;
    left: 50%;
  }
  .dot {
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 3px;
    margin-right: 6px;
  }
  .on {
    background-color: black;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 1400px;
  height: 500px;
  overflow: hidden;
  margin: 20px auto;
`;

const Slide = styled.ul`
  width: 40%;
  height: 500px;
  display: flex;
  li {
    img {
      width: 1400px;
      height: 500px;
    }
  }
`;

export default Banner;
