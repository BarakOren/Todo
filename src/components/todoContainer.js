import styled from "styled-components";

const TodoContainer = styled.div`
    border-radius: 50px;
    padding: 2vw;
    margin: 10vh 0;
    width: 50%;
    min-height: 30vh;
    box-shadow: 3px 3px 1px black;
    background-color: ${p => p.theme.BackgroundColor};
    color: ${p => p.theme.bodyFontColor};
`

export default TodoContainer;