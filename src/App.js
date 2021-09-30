import React, {useState, useEffect} from "react";
import firebase from "firebase";
import {db} from "./firebaseConfige";
import TodoItem from "./todoItem/todoItem";
import AddIcon from '@material-ui/icons/Add';

import TextArea from "./components/textarea";
import Container from "./components/container";
import GlobalStyle from "./components/globalstyle";
import Title from "./components/title";
import Toggle from "./components/toggle";
import TodoContainer from "./components/todoContainer";
import {ThemeProvider} from "styled-components";

import LightTheme from "./themes/light";
import DarkTheme from "./themes/dark";

function App() {
  
 



  const [todos, setTodos] = useState([]);

  function getTodos(){
    db.collection("todos").orderBy("timestemp", "asc").onSnapshot(function(querySnapshot){
      setTodos(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        done: doc.data().done
      }))
      )
    })
  }

  useEffect(() => {
    getTodos();
  },[])

  const [todoInput, setTodoIntup] = useState("")

  function addTodo(e){
    e.preventDefault();
    db.collection("todos").add({
      timestemp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
      done: false,
    })
    setTodoIntup("")
    document.getElementById("textarea").value = "";
  }

  const [theme, setTheme] = useState(DarkTheme);
  
  return (
    <ThemeProvider theme={{...theme, setTheme: () => {
      setTheme(s => s.id === "light" ? DarkTheme : LightTheme)
    }}}>
      

    <GlobalStyle>
      <Toggle />
        <Container>

          <Title>TO DO LIST</Title>
      
            <form>
              <TextArea
              maxlength="30"
              id="textarea"
              rows="1"
              onChange={(e) => {
                setTodoIntup(e.target.value)
              }}
              placeholder="Add"
              />

              <AddIcon onClick={addTodo}
              style={{ color: `${p => p.theme.UIcolor}` , fontSize: 45, cursor: "pointer", marginBottom: "-3px"}}>
              </AddIcon>
            </form>
      
        </Container>
      
        <TodoContainer>
        {todos.map((todo, index) => <TodoItem index={index} id={todo.id} todo={todo.todo} done={todo.done} />)}
        </TodoContainer>
      </GlobalStyle>
    </ThemeProvider>
  );
}

export default App;
