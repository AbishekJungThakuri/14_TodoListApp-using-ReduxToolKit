import React, { useEffect, useState } from 'react';
import { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } from '../Store/TodoSlice';
import { TiPencil } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

export const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  const [showModal, setShowModal] = useState(false);   // for displaying input 
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState('');


  // This useEffect Saves the updated todoList to local storage whenever there are changes to the todoList.
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todolist', JSON.stringify(todoList));
    }
  }, [todoList]);


  // This useEffect Loads the todoList from local storage into the Redux state when the component mounts.
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem('todolist'));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, [dispatch]);


 // Handling Sorting of the task
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const sortedToDoList = todoList.filter((todo) => {
    if (sortCriteria === 'All') return true;
    if (sortCriteria === 'Completed' && todo.completed) return true;
    if (sortCriteria === 'Not Completed' && !todo.completed) return true;
    return false;
  });
  

  // Handling Add function
  const handleAddToDo = (task) => {
    if (task.trim().length === 0) {
      alert('Please enter a task');
    } else {
      dispatch(addTodo({
        task: task,
        id: Date.now(),
      }));
      setNewTask('');
      setShowModal(false);
    }
  };


  // Handling Delete function
  const handleDeleteToDo = (id) => {
    const updateToDoList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updateToDoList));
    localStorage.setItem('todolist', JSON.stringify(updateToDoList));
  };

    // Handling Update function
  const handleUpdateTodoList = (id, task) => {
    if (task.trim().length === 0) {
      alert('Please enter a task');
    } else {
      dispatch(updateTodo({
        task: task,
        id: id,
      }));
      setShowModal(false);
    }
  };

    // Handling Toggle function
  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div>
      {
      showModal && (
        <div className="w-full fixed bg-[rgba(0,0,0,0.5)] left-0 top-0 h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              className="w-full p-2 border rounded-md outline-none mb-8"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? 'Update your task here' : 'Enter your task here'
              }
            />

            <div className="flex justify-between">
              {currentTodo ? (
                <>
                  <button
                  lassName="text-white bg-orange-500 rounded-md py-3 px-10"
                    onClick={() => handleUpdateTodoList(currentTodo.id, newTask)}
                  >
                    Save
                  </button>
                  <button
                  className="text-white bg-slate-700 rounded-md py-3 mr-4 px-10"
                   onClick={() => setShowModal(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <button
                    className="text-white bg-slate-700 rounded-md py-3 mr-4 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-orange-500 rounded-md py-3 px-10"
                    onClick={() => handleAddToDo(newTask)}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )
      }

      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <>
            <p className="mt-3 text-center text-gray-500 font-semibold text-lg">
              You have no Todo's, Please add one
            </p>
          </>
        ) : (
          <div className="container mx-auto mt-6">
            <div className='mx-auto mt-6 flex flex-col items-center justify-center'>
              <select className='w-[70%] md:w-[50%] py-3 px-1 rounded-md' onChange={(e) => handleSort(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
            <div className='mx-auto mt-6 flex flex-col items-center justify-center'>
              {sortedToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className="w-[70%] flex items-center justify-between mb-6 bg-slate-800 rounded-md px-8 py-3 md:w-[50%]"
                >
                  <div
                    className={`${todo.completed ? "line-through text-green-600" : "text-white"}`}
                    onClick={() => handleToggleCompleted(todo.id)}
                  >
                    {todo.task}
                  </div>
                  <div>
                    <button className="bg-blue-500 text-white p-1 rounded-md">
                      <TiPencil
                        onClick={() => {
                          setShowModal(true);
                          setCurrentTodo(todo);
                          setNewTask(todo.task);
                        }}
                      />
                    </button>
                    <button className="bg-orange-500 text-white p-1 rounded-md ml-2">
                      <BsTrash onClick={() => handleDeleteToDo(todo.id)} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          className="text-white bg-orange-500 text-center py-3 px-10 rounded-md"
          onClick={() => {
            setShowModal(true);
            setCurrentTodo(null);
            setNewTask('');
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};
