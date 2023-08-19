// components
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import MainGrid from "../components/MainGrid";

function SellerMain() {
  const userType = localStorage.getItem("type");

  return (
    <div>
      {userType === "SELLER" ? <Nav /> : <Nav user_nav />}
      <Banner />
      <MainGrid />
      <Footer />
    </div>
  );
}

export default SellerMain;
