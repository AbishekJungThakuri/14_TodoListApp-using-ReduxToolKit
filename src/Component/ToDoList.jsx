import React, { useEffect, useState } from 'react'
import { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted} from '../Store/TodoSlice'
import { TiPencil } from 'react-icons/ti'
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'


export const ToDoList = () => {

   const dispatch = useDispatch();
   const todoList = useSelector(state => state.todo.todoList);
   const sortCriteria = useSelector(state => state.todo.sortCriteria);

   const [showModal, setShowModel] = useState(false);
   const [currentTodo, setCurrentTodo] = useState(null);
   const [newTask, setNewTask] = useState("");



   useEffect(()=>{
    if (todoList.length > 0){
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  },[todoList]);

  useEffect(()=>{
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if(localTodoList ){
      dispatch(setTodoList(localTodoList));
    }
  },[])



   const handleAddToDo = (task) => {
    if (task.trim().length === 0){
      alert("Please enter a task");
    }else{
      dispatch(addTodo({
        task: task,
        id: Date.now(),
      }))
    }
    setNewTask("")
    setShowModel(true)
   }

   
   return (
     <div>
      
      { showModal && (
        <div className='w-full fixed bg-[rgba(0,0,0,0.5)] left-0 top-0 h-full flex items-center justify-center'>
          <div className='bg-white p-8 rounded-md'>
            <input
            className='w-full p-2 border rounded-md outline-none mb-8'
             type="text" 
             value={newTask}
             onChange={(e)=> setNewTask(e.target.value)}
             placeholder = {
              currentTodo ? 'Update your task here'
              : 'Enter your task here'
              } />

            <div>
             {currentTodo ? 
             <>
                <button>Save</button>
                <button>Cancel</button>
             </> : 
             <>
             <button 
             className='text-white bg-slate-700 rounded-md py-3 mr-4 px-10'
             onClick={()=>setShowModel(false)}
             >Cancel</button>
             <button
              className='text-white bg-orange-500 rounded-md py-3 px-10'
              onClick={()=>{
                setShowModel(false);
                handleAddToDo(newTask);
              }}
              >Add</button>
             </>} 
            </div>
          </div>
        </div>
      )}

      <div className='flex items-center justify-center flex-col'>
        {
          todoList.length === 0 ?
           <>
            <p className='mt-3 text-center text-gray-500 font-semibold text-lg'>You have no Todo's, Please add one</p>
           </> : 
           <>
           </>
        }
      </div>
     <div className='flex justify-center items-center mt-5'>
     <button className='text-white bg-orange-500 text-center py-3 px-10 rounded-md' onClick={()=>setShowModel(true)} >Add Task</button>
     </div>
      
    </div>
  )
}
