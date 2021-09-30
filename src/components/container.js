import styled from "styled-components";

const Container = styled.div`
    margin-top: 10vh;
    border-radius: 50px;
    padding: 2vw;
    width: 50%;
    box-shadow: 3px 3px 1px black;
    color: ${p => p.theme.bodyFontColor};
    background: ${p => p.theme.BackgroundColor};
`


export default Container;