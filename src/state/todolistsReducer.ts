import { FilterTaskType, TodolistType } from "../AppWithRedux";
import { TodolistFromServerType } from "../api/todolistApi";
import { Dispatch } from "redux";
import { todolistApi } from './../api/todolistApi';
import { appActions } from "./appReducer";
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export type ActionType =  ChangeFilterActionType 
//                         | AddTodolistActionType 
//                         | ChangeTodolistTitleActionType 
//                         | RemoveTodolistActionType
//                         | SetTodolistsACActionType

export const fetchTodolists = createAsyncThunk<TodolistFromServerType[], void>('todolists/fetchTodolists', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.set()
        dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
        return response.data
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
})
export const addTodolist = createAsyncThunk<TodolistFromServerType, string>('todolists/addTodolist', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const objForRequest = { title: arg }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.addTodo(objForRequest)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return response.data.data.item
        } else {
            errorAppServerHeandler(dispatch, response.data)
            return rejectWithValue(response.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
}
)
export const removeTodolist = createAsyncThunk<string, string>('todolists/removeTodolist', async (todolistId, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.removeTodo(todolistId)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return todolistId
        } else {
            errorAppServerHeandler(dispatch, response.data)
            return rejectWithValue(response.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
})
export const updateTodolist = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }>('todolists/updateTodolist', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const todoForRequest = { title: arg.title }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.updateTodo(arg.id, todoForRequest)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { id: arg.id, title: arg.title }
        } else {
            errorAppServerHeandler(dispatch, response.data)
            return rejectWithValue(response.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
})


const initialState: Array<TodolistType> = []
const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.map(todo => ({ ...todo, filter: 'all' }))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                let newTodo = { ...action.payload, filter: 'all' as FilterTaskType }
                state.unshift(newTodo)
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                let ind = state.findIndex(todo => todo.id === action.payload)
                if (ind !== -1) {
                    state.splice(ind, 1)
                }
            })
            .addCase(updateTodolist.fulfilled, (state, action) => {
                let ind = state.findIndex(todo => todo.id === action.payload.id)
                if (ind !== -1) {
                    state[ind].title = action.payload.title
                }
            })
    }
})
export const todolistsReducer = todolistsSlice.reducer

// export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistType> => {
//     switch (action.type) {
//         case 'ADD-TODOLIST':
//             const newTodolist = {...action.payload.todo, filter: 'all' as FilterTaskType}
//             return [...state, newTodolist]
//         case 'REMOVE-TODOLIST':
//             return state.filter(t => t.id !== action.payload.todolistId)
//         case 'CHANGE-FILTER':
//             return state.map(todo=> todo.id === action.payload.todolistId ? {...todo, filter: action.payload.newFilterValue} : todo)
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(el => el.id === action.payload.todolistId ? { ...el, title: action.payload.newTitle } : el)
//         case 'SET-TODOLISTS':
//             return action.payload.todos.map(todo => ({...todo, filter: 'all'}))
//         default: return state
//     }
