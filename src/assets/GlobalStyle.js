import { createGlobalStyle } from "styled-components";

// 배경색, 글꼴 색
export const mainColor = "#FDDC26";
export const lightMainColor = "#FEF9CE";
export const whiteColor = "#FFFFFF";
export const blackColor = "#000000";
export const greyColor = "#C4C4C4";
export const darkGreyColor = "#767676";
export const redColor = "#EB5757";

const GlobalStyle = createGlobalStyle`
  html, body, div
 {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

export default GlobalStyle;
