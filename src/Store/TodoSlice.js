import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList : [],
    sortCriteria: "All",
};

export const ToDoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {
      addTodo : (state, action) => {
        state.todoList.push({
            task: action.payload.task,
            id: action.payload.id,
            completed: false
        })
      }   
    }
})