import React, { useState, useEffect } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CustomCheckbox from './assets/check';
interface Todo {
  text: string;
  isChecked: boolean;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  
//load localstorage
const loadFromLocalStorage = () => {
  try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : []; // Parse the stored data or return an empty array
  } catch (error) {
      console.error("Error loading from local storage", error);
      return []; // Return an empty array in case of error
  }
};
// Function to save todos to local storage
const saveToLocalStorage = (todos: Todo[]) => { // Specify the type of todos
  try {
      localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
      console.error("Error saving to local storage", error);
  }
};

// In your component
useEffect(() => {
  const initialTodos = loadFromLocalStorage(); // Load todos when the component mounts
  setTodos(initialTodos);
}, []);

// Whenever todos change, save them to local storage
useEffect(() => {
  saveToLocalStorage(todos);
}, [todos]);


  //add
  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert('please write something!!!!!!')
      return;
    }
    const newTodo: Todo = {
      text: inputValue,
      isChecked: false,
    };
    //update
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInputValue('');
    saveToLocalStorage(updatedTodos)
  }
  //checked
  const toggleTodo = (index: number) => {
    const updatedTodos =[...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos)
  }
  //delete
  const deleteTodo =(index : number) =>{
    const updatedTodos = todos.filter((_,i) => i !== index);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos)
    
  }
  //edit
  const editTodo =(index:number)=>{
    const updatedTodos = [...todos];
    const newText = prompt('edit your todo:', updatedTodos[index].text);
    if(newText){
      updatedTodos[index].text =newText;
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos)

    }
  }
  return (
    <>
      <div className="bg App  min-h-[120vh] max-h-auto flex justify-center items-center whitespace-break-spaces font-ds ">
        <div className="main w-96 min-h-96 max-h-auto bg-[#10101d] rounded-lg my-8 ">
          <div className="todo w-full bg-transparent h-auto rounded-lg ">
            <div className="h-[20%] w-full flex justify-start items-center  rounded-lg p-5 animate-bounce mt-5">

              <Typography sx={{color:'white',fontWeight:'bolder',fontSize:'20px'}}>
              TO DO LIST
              </Typography>
            </div>
            <div className="h-[20%] w-full flex justify-center items-center  rounded-lg ">
              <div className="h-full w-[80%] flex justify-center items-center  rounded-lg ml-5 ">
              <input className="text-white w-full outline-none bg-transparent border-b-2 border-white" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                 placeholder="Add New Task"

              />
              </div>
              <div className="h-full w-[20%] flex justify-center items-center  rounded-lg ">
              <button onClick={addTodo} className="w-[35px] h-[35px] bg-[#ee9ca7] rounded-full text-white">
                <AddIcon/>
              </button>
              </div>
            </div>
            <ul id="list" className="flex justify-center items-center flex-col">
              {todos.map((todo, index) => (
                <li key={index} className="w-[90%] h-full flex justify-center items-center   my-3 text-white bg-[#191933]">
                  <div className="w-[68%] h-full mx-2">
                    <b className="stufftodo ">
                      {todo.text}
                    </b>
                  </div>
                 <div className="w-[30%] h-full">
                 <CustomCheckbox   checked={todo.isChecked}
                    onChange={() => toggleTodo(index)} label=""/>

                  <span onClick={()=> deleteTodo(index)} className="!text-[#bf3341]">
                    <DeleteForeverOutlinedIcon/>
                  </span>
                  <em onClick={()=> editTodo(index)} className="!text-[#bf3341] ml-3">
                    <EditNoteIcon/>
                  </em>
                 </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </>
  );

};
export default App;