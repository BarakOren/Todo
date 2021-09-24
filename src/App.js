import React, {useState, useEffect} from "react";
import firebase from "firebase";
import {db} from "./firebaseConfige";
import './App.scss';
import TodoItem from "./todoItem/todoItem";
import AddIcon from '@material-ui/icons/Add';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import {themes} from "./themes";
import grey from '@material-ui/core/colors/grey';

export const ThemeContext = React.createContext()

function App() {
  
  const [Theme, setTheme] = useState(true)
  const light = themes.light;
  const dark = themes.dark
  function toggleTheme(){
    setTheme(!Theme)
  }

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


  return (
    <ThemeContext.Provider value={Theme}>
    <div className="App"
    style={{background: Theme ? dark.screenBackground : light.screenBackground}}
    >
      <Brightness6Icon 
      style={{color: Theme ? "white" : grey[900],
      backgroundColor: Theme ? dark.background : light.background}} 
      className="toggler" 
      onClick={() => toggleTheme()}/>

      <div className="container"
      style={{backgroundColor: Theme ? dark.background : light.background}}
      >

      <h1 style={{ color: Theme ? dark.color1 : light.color1}}>TO DO LIST</h1>
      
      <form>
      <textarea
      style={{
      backgroundColor: Theme ? dark.background : light.background,
      color: Theme ? dark.color1 : light.color1,
      borderColor: Theme ? dark.color1: light.color1
      }}
      maxlength="30"
      id="textarea"
      rows="1"
      onChange={(e) => {
        setTodoIntup(e.target.value)
      }}
      placeholder="Add"
      />

      <AddIcon onClick={addTodo}
      style={{ color: Theme ? "white" : grey[900] ,fontSize: 45, cursor: "pointer", marginBottom: "-3px"}}>
      </AddIcon>
      </form>
      
      </div>
      <div className="todosContainer" style={{backgroundColor: Theme ? dark.background : light.background}}>
      {todos.map((todo, index) => <TodoItem index={index} id={todo.id} todo={todo.todo} done={todo.done} />)}
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
