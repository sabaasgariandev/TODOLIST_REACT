import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CustomCheckbox from './assets/check';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FlakySharpIcon from '@mui/icons-material/FlakySharp';
interface Todo {
  text: string;
  isChecked: boolean;
  date?: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State for todos
  const [inputValue, setInputValue] = useState<string>('');
  const [dateValue, setDateValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all'); // State for filter

  // Load todos from local storage
  useEffect(() => {
    const storedTodos = loadFromLocalStorage();
    setTodos(storedTodos);
  }, []);

  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert('please write something!!!!!!');
      return;
    }
    const newTodo: Todo = {
      text: inputValue,
      isChecked: false,
      date: dateValue,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInputValue('');
    setDateValue('');
    saveToLocalStorage(updatedTodos);
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const editTodo = (index: number) => {
    const newText = prompt('edit your todo:', todos[index].text);
    if (newText) {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    }
  };

  // Function to filter todos based on their status
  const filteredTodos = () => {
    let filtered = todos;
    if (filter === 'completed') {
      filtered = todos.filter(todo => todo.isChecked);
    } else if (filter === 'incomplete') {
      filtered = todos.filter(todo => !todo.isChecked);
    }

    // Sort by date and time, placing todos without date at the end
    return filtered.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.date ? -1 : 1; // If a has date and b doesn't, a comes first
    });
  };

  // Load from local storage
  const loadFromLocalStorage = () => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error loading from local storage", error);
      return [];
    }
  };

  // Save to local storage
  const saveToLocalStorage = (todos: Todo[]) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };

  return (
    <div className="bg App min-h-[120vh] max-h-auto flex justify-center items-center whitespace-break-spaces font-ds">
      <div className="main w-96 min-h-96 max-h-auto bg-[#10101d] rounded-lg my-8">
        <div className="todo w-full bg-transparent h-auto rounded-lg">
          <div className="h-[20%] w-full flex justify-start items-center rounded-lg p-5 animate-bounce mt-5">
            <Typography sx={{ color: 'white', fontWeight: 'bolder', fontSize: '20px' }}>
              TO DO LIST
            </Typography>
          </div>
          <div className="h-[20%] w-full flex justify-center items-center rounded-lg">
            <div className="h-full w-[80%] flex justify-center items-center rounded-lg ml-5">
              <input
                className="text-white w-full outline-none bg-transparent border-b-2 border-white"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add New Task"
              />
              <input
                className="text-white w-full outline-none bg-transparent border-b-2 border-white ml-2"
                type="datetime-local"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
              />
            </div>
            <div className="h-full w-[20%] flex justify-center items-center rounded-lg">
              <button onClick={addTodo} className="w-[35px] h-[35px] bg-[#ee9ca7] rounded-full text-white">
                <AddIcon />
              </button>
            </div>
          </div>
          <div className="filter-buttons flex justify-center my-4">
            <div className="filter-button mx-2 cursor-pointer" onClick={() => setFilter('all')}>
              <span className="text-white hover">All <FlakySharpIcon/></span>
            </div>
            <div className="filter-button mx-2 cursor-pointer" onClick={() => setFilter('completed')}>
              <span className="text-[#ee9ca7] hover">Completed <TaskAltSharpIcon/> </span>
            </div>
            <div className="filter-button mx-2 cursor-pointer" onClick={() => setFilter('incomplete')}>
              <span className="text-[#bf3341] hover">Incomplete <CancelOutlinedIcon/></span>
            </div>
          </div>
          <ul id="list" className="flex justify-center items-center flex-col">
            {filteredTodos().map((todo, index) => (
              <li key={index} className={`w-[90%] h-full flex justify-center items-center my-3 ${todo.isChecked ? 'line-through text-gray-500' : 'text-white'} bg-[#191933]`}>
                <div className="w-[68%] h-full mx-2">
                  <b className="stufftodo">
                    {todo.text} {todo.date && `(${todo.date})`} {/* نمایش تاریخ */}
                  </b>
                </div>
                <div className="w-[30%] h-full">
                  <CustomCheckbox checked={todo.isChecked} onChange={() => toggleTodo(index)} label="" />
                  <span onClick={() => deleteTodo(index)} className="!text-[#bf3341]">
                    <DeleteForeverOutlinedIcon />
                  </span>
                  <em onClick={() => editTodo(index)} className="!text-[#bf3341] ml-3">
                    <EditNoteIcon />
                  </em>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
