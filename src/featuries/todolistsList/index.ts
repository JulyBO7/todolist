import {Todolist} from './ui/Todolist/Todolist';
import {TodolistsList} from './ui/TodolistList';
import { todolistsSlice } from './model/todolistsReducer';
import {todolistsAsyncActions} from './model/todolistsReducer';
import {tasksAsyncActions} from './model/tasksReducer';
import { tasksSlice } from './model/tasksReducer';
import {Task} from './ui/Task/Task';

const todolistsReducer = todolistsSlice.reducer
const todolistsActions = {
    ...todolistsSlice.actions,
    ...todolistsAsyncActions
}
const tasksReducer = tasksSlice.reducer
const tasksActions = {
    ...tasksSlice.actions,
    ...tasksAsyncActions
}
export {
    todolistsReducer, 
    todolistsActions,
    tasksReducer,
    tasksActions,
    Task,
    Todolist,
    TodolistsList
}