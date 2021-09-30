import React, {useState} from "react";
import {db} from "../firebaseConfige";
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import styled from "styled-components";

const TodoDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px;
    padding: 10px 0 10px 0;
`
const TodoTitle = styled.p`
        text-align: start; 
        margin: 0 1vw 0 1vw;
        font-size: 2vw;
        width: 90%;
        cursor: text;
`

const TodoTextArea = styled.textarea`
    font-family: 'Work Sans', sans-serif;
    background-color: rgb(48, 19, 122);
    color: white;
    width: 90%;
    outline: none;
    border: solid 1px;
    margin: 0 1vw 0 1vw;
    border-radius: 5px;
    background-color: ${p => p.theme.BackgroundColor};
`


const TodoItem = ({todo, done, id, index}) => {

    const [update, setUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState("");

    function deleteTodo(){
        db.collection("todos").doc(id).delete();
    }

    function updateTodo(){
        db.collection("todos").doc(id).update({
            todo: toUpdate
        })
        setUpdate(false);
    }

    function doneTodo(){
        db.collection("todos").doc(id).update({
            done: !done
        })
    }


    const size = 35
    return(
        <TodoDiv 
        key={index.toString()}
        style={{
            opacity: done ? "0.3" : "1"
        }}
        >
            {done ? 
            <CheckCircleIcon 
            onClick={() => doneTodo()} 
            style={{ color: `${p => p.theme.UIcolor}` , fontSize: size, cursor: "pointer"}} />
            :
            <CheckCircleOutlineIcon 
            onClick={() => doneTodo()} 
            style={{ color: `${p => p.theme.UIcolor}`, fontSize: size, cursor: "pointer"}} />
            }
            {update ?
            <TodoTextArea
            maxlength="30"
            rows="1"
            onChange={e => setToUpdate(e.target.value)}
            ></TodoTextArea> 
            : 
            <TodoTitle
            onClick={() => setUpdate(!update)} 
            >{todo}</TodoTitle>}
            
            { update ? 
            <DoneIcon 
            style={{ color: `${p => p.theme.UIcolor}`, fontSize: size, cursor: "pointer" }} 
            onClick={() => updateTodo()} />
            :
            <EditIcon 
            style={{ color: `${p => p.theme.UIcolor}`, fontSize: size, cursor: "pointer" }} 
            onClick={() => setUpdate(true)}/>
            }
            <ClearIcon 
            style={{ color: `${p => p.theme.UIcolor}`, fontSize: size, cursor: "pointer" }} 
            onClick={() => deleteTodo()} 
            />

        </TodoDiv>

    )
}

export default TodoItem;