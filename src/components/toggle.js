import React, {useContext} from "react";
import styled, {ThemeContext} from "styled-components";
import Brightness6Icon from '@material-ui/icons/Brightness6';


const ToggleContainer = styled.div`
    cursor: pointer;
    position: absolute;
    padding: 1vw;
    border-radius: 25px;
    top: 5vw;
    left: 10vw;
    z-index: 1;
    box-shadow: 3px 3px 1px black;
    background-color: ${p => p.theme.BackgroundColor}
`


const Toggle = () => {
    const {setTheme} = useContext(ThemeContext);

    return(
        <ToggleContainer onClick={setTheme}>
       <Brightness6Icon 
        style={{color: `${p => p.theme.UIcolor}`}} 
        />
        </ToggleContainer>
    )
}

export default Toggle;