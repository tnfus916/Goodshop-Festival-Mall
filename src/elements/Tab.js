import styled from "styled-components";
import { greyColor, whiteColor } from "../assets/GlobalStyle";

function Tab(props) {
  const { children, children2 } = props;
  return (
    <div>
      <TabContainer>
        <li onClick={() => props.setTab(0)}>
          <p className={props.tab === 0 ? "tab-on1" : "tab1"}>{children}</p>
        </li>
        <li onClick={() => props.setTab(1)}>
          <p className={props.tab === 1 ? "tab-on2" : "tab2"}>{children2}</p>
        </li>
      </TabContainer>
    </div>
  );
}

const TabContainer = styled.ul`
  width: 440px;
  display: table;
  table-layout: fixed;
  box-sizing: border-box;
  border-collapse: collapse;
  li {
    display: table-cell;
    text-align: center;
    box-sizing: border-box;
    background-color: #f8f9fa;
    vertical-align: bottom;
    cursor: pointer;
    p {
      font-weight: bold;
    }
    .tab-on1 {
      background-color: ${whiteColor};
      height: 60px;
      padding-top: 17px;
      border: 1px solid ${greyColor};
      border-bottom: 1px solid transparent;
      border-radius: 10px 10px 0 0;
    }
    .tab-on2 {
      background-color: ${whiteColor};
      height: 60px;
      padding-top: 17px;
      box-sizing: border-box;
      border: 1px solid ${greyColor};
      border-bottom: 1px solid transparent;
      border-radius: 10px 10px 0 0;
    }
    .tab1 {
      height: 60px;
      padding-top: 17px;
      border: 1px solid ${greyColor};
      border-radius: 10px 10px 0 0;
    }
    .tab2 {
      height: 60px;
      padding-top: 17px;
      box-sizing: border-box;
      border: 1px solid ${greyColor};
      border-radius: 10px 10px 0 0;
    }
  }
`;

export default Tab;
