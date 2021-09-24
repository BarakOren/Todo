import React, {useState, useContext} from "react";
import "./todoItem.scss";
import {db} from "../firebaseConfige";
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import grey from '@material-ui/core/colors/grey';
import { ThemeContext } from "../App";
import {themes} from "../themes";

const TodoItem = ({todo, done, id, index}) => {

    const Theme = useContext(ThemeContext)

    const light = themes.light;
    const dark = themes.dark;

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
        <div 
        className="todoItem" 
        key={index.toString()}
        style={{
            borderColor: Theme ? dark.color1 : light.color1,
            opacity: done ? "0.3" : "1"
        }}
        >
            {done ? 
            <CheckCircleIcon 
            onClick={() => doneTodo()} 
            style={{ color: Theme ? "white" : grey[900], fontSize: size, cursor: "pointer"}} />
            :
            <CheckCircleOutlineIcon 
            onClick={() => doneTodo()} 
            style={{ color: Theme ? "white" : grey[900], fontSize: size, cursor: "pointer"}} />
            }
            {update ?
            <textarea
            style={{
                color: Theme ? dark.color1 : light.color1,
                borderColor: Theme ? dark.color1 : light.color1,
                backgroundColor: Theme ? dark.background : light.background
            }}
            maxlength="30"
            rows="1"
            onChange={e => setToUpdate(e.target.value)}
            ></textarea> 
            : 
            <p 
            onClick={() => setUpdate(!update)} 
            className="todoTitle"
            style={{color: Theme ? dark.color1 : light.color1 }}
            >{todo}</p>}
            
            { update ? 
            <DoneIcon 
            style={{ color: Theme ? "white" : grey[900], fontSize: size, cursor: "pointer" }} 
            onClick={() => updateTodo()} />
            :
            <EditIcon 
            style={{ color: Theme ? "white" : grey[900], fontSize: size, cursor: "pointer" }} 
            onClick={() => setUpdate(true)}/>
            }
            <ClearIcon 
            style={{ color: Theme ? "white" : grey[900], fontSize: size, cursor: "pointer" }} 
            onClick={() => deleteTodo()} 
            className="done" />

        </div>

    )
}

export default TodoItem;