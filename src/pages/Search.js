import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import SearchGrid from "../components/SearchGrid";
import { apis } from "../shared/api";

function Search() {
  const userType = localStorage.getItem("type");
  const isLogin = localStorage.getItem("token");
  const location = useLocation();
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    apis
      .searchProduct(location.state.search)
      .then((res) => {
        const list = res.data.results;
        const filterList = list.filter((p) =>
          p.product_name
            .replace(" ", "")
            .toLocaleLowerCase()
            .includes(
              location.state.search.toLocaleLowerCase().replace(" ", "")
            )
        );
        setSearchList(filterList);
      })
      .catch((error) => {
        console.log("서치에러", error);
      });
  }, [location.state.search]);

  return (
    <div>
      {userType === "SELLER" ? <Nav /> : <Nav user_nav />}
      <SearchGrid searchList={searchList} />
    </div>
  );
}

export default Search;
