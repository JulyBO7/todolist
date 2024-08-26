import { FilterTaskType, TodolistType } from '../../../app/App';
import { Todolist } from '../api/todolistsApi'
import { todolistApi } from '../api/todolistsApi';
import { appActions } from '../../../app/appReducer';
import { handleServerAppError, handleNetworkError } from '../../../common/utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseResponse } from '../../../common/types';

const fetchTodolists = createAsyncThunk<Todolist[], void, {rejectValue: Error}>('todolists/fetchTodolists', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.set()
        dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
        return response.data
    } catch (error) {
        return handleNetworkError (dispatch,rejectWithValue, error as Error)
        // return rejectWithValue(error)
    }
})
const addTodolist = createAsyncThunk<Todolist, string, {rejectValue: BaseResponse | {message: string}}>('todolists/addTodolist', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const objForRequest = { title: arg }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.addTodo(objForRequest)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return response.data.data.item
        } else {
            return handleServerAppError(dispatch, rejectWithValue, response.data, false)
        }
    } catch (error) {
        return handleNetworkError (dispatch, rejectWithValue, error as Error)
    }
}
)
const removeTodolist = createAsyncThunk<string, string, {rejectValue: BaseResponse | {message: string}}>('todolists/removeTodolist', async (todolistId, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.removeTodo(todolistId)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return todolistId
        } else {
            return handleServerAppError(dispatch, rejectWithValue, response.data)
        }
    } catch (error) {
        return handleNetworkError (dispatch, rejectWithValue, error as Error)
    }
})
const updateTodolist = createAsyncThunk<{ id: string, title: string }, { id: string, title: string}, {rejectValue: BaseResponse | {message: string}}>('todolists/updateTodolist', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const todoForRequest = { title: arg.title }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let response = await todolistApi.updateTodo(arg.id, todoForRequest)
        if (response.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { id: arg.id, title: arg.title }
        } else {
            return handleServerAppError(dispatch, rejectWithValue, response.data)
        }
    } catch (error) {
        return handleNetworkError (dispatch, rejectWithValue, error as Error)
    }
})


const initialState: Array<TodolistType> = []
export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterTaskType  }>)=> {
            let ind = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (ind !== -1){
                state[ind].filter = action.payload.filter
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {

                debugger
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
// export const todolistsReducer = todolistsSlice.reducer
// export const todolistsActions = todolistsSlice.actions
export const todolistsAsyncActions = {
    fetchTodolists,
    addTodolist,
    removeTodolist,
    updateTodolist
}