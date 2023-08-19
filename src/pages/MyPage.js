import React from "react";
import Footer from "../components/Footer";
import MainGrid from "../components/MainGrid";
import Nav from "../components/Nav";

function MyPage() {
  const isLogin = localStorage.getItem("token");
  return (
    <div>
      <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
      <MainGrid />
      <Footer />
    </div>
  );
}

export default MyPage;
