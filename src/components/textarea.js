import styled from "styled-components";

const TextArea = styled.textarea`
    font-family: 'Work Sans', sans-serif;
    color: white;
    font-size: 2vw;
    width: 80%;
    outline: none;
    border: 1px solid;
    border-radius: 5px;
    background-color: ${p => p.theme.BackgroundColor};
    color: ${p => p.theme.bodyFontColor};
    border-color: ${p => p.theme.bodyFontColor};
`;



export default TextArea;
