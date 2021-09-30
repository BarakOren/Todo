import styled from "styled-components";

const GlobalStyle = styled.div`
  min-width: 100vw;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: ${p => p.theme.bodyFontColor};
  background: ${p => p.theme.screenBackground};

`

export default GlobalStyle;