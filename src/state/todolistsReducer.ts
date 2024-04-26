import { FilterTaskType, TodolistType } from "../AppWithRedux";
import { TodolistFromServerType } from "../api/todolistApi";
import { Dispatch } from "redux";
import { todolistApi } from './../api/todolistApi';
import { ChangeAppStatusActionType, changeAppStatusAC } from "./appReducer";
import axios from "axios";
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil";

export type ActionType =  ChangeFilterActionType 
                        | AddTodolistActionType 
                        | ChangeTodolistTitleActionType 
                        | RemoveTodolistActionType
                        | SetTodolistsACActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist = {...action.payload.todo, filter: 'all' as FilterTaskType}
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'CHANGE-FILTER':
            return state.map(todo=> todo.id === action.payload.todolistId ? {...todo, filter: action.payload.newFilterValue} : todo)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.todolistId ? { ...el, title: action.payload.newTitle } : el)
        case 'SET-TODOLISTS':
            return action.payload.todos.map(todo => ({...todo, filter: 'all'}))      
        default: return state
    }
}
//action types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsACActionType = ReturnType<typeof setTodolistsAC>
//AC
export const addTodolistAC = (todo: TodolistFromServerType) => ({type: 'ADD-TODOLIST',payload: {todo}} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST',payload: {todolistId}} as const)
export const changeFilterAC = (todolistId: string, newFilterValue: FilterTaskType) => ({type: 'CHANGE-FILTER',payload: {todolistId,newFilterValue}} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({type: 'CHANGE-TODOLIST-TITLE',payload: {todolistId,newTitle}} as const)
export const setTodolistsAC = (todos: TodolistFromServerType []) => ({type: 'SET-TODOLISTS',payload: { todos}} as const)
//TC
export const setTodolistsTC = ()=> {
    console.log('setTodolThunk')
    return async (dispatch: DispatchThunkType )=> {
        try{
            dispatch(changeAppStatusAC('loading'))                        
            let response = await todolistApi.set()
            dispatch(setTodolistsAC(response.data))
            dispatch(changeAppStatusAC('succeeded'))
        } catch (error){
            if(axios.isAxiosError(error)){
                if(error.response){
                    errorNetworkHeandler(dispatch,error.response.data)
                }else{
                    errorNetworkHeandler(dispatch,error)
                }
            } else{
                errorNetworkHeandler(dispatch,error as Error)
            }
        }
    }
}
export const addTodolistTC = (title: string)=> {
    return async (dispatch: DispatchThunkType )=> {
        try{
            const objForRequest = {title}
            dispatch(changeAppStatusAC('loading'))                        
            let response = await todolistApi.addTodo(objForRequest)
            if(response.data.resultCode ===0){
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(changeAppStatusAC('succeeded'))
            } else{
                errorAppServerHeandler(dispatch,response.data)
            }
        } catch (error){
            if(axios.isAxiosError(error)){
                if(error.response){
                    errorNetworkHeandler(dispatch,error.response.data)
                }else{
                    errorNetworkHeandler(dispatch,error)
                }
            } else{
                errorNetworkHeandler(dispatch,error as Error)
            }
        }
    }
}
export const removeTodolistTC = (id: string)=> {
    return async (dispatch: DispatchThunkType )=> {
        try{
            dispatch(changeAppStatusAC('loading'))                        
            let response = await todolistApi.removeTodo(id)
            if(response.data.resultCode ===0){
                dispatch(removeTodolistAC(id))
                dispatch(changeAppStatusAC('succeeded'))
            }else{
                errorAppServerHeandler(dispatch,response.data)
            }
        } catch (error){
            if(axios.isAxiosError(error)){
                if(error.response){
                    errorNetworkHeandler(dispatch,error.response.data)
                }else{
                    errorNetworkHeandler(dispatch,error)
                }
            } else{
                errorNetworkHeandler(dispatch,error as Error)
            }
        }
    }
}
export const updateTitleTodolistTC = (id: string,title: string)=> {
    return async (dispatch: DispatchThunkType )=> {
        try{
            const todoForRequest = {title}
            dispatch(changeAppStatusAC('loading'))                        
            let response = await todolistApi.updateTodo(id,todoForRequest)
            if(response.data.resultCode ===0){
                dispatch(changeTodolistTitleAC(id,title))
                dispatch(changeAppStatusAC('succeeded'))
            }else{
                errorAppServerHeandler(dispatch,response.data)
            }
        } catch (error){
            if(axios.isAxiosError(error)){
                if(error.response){
                    errorNetworkHeandler(dispatch,error.response.data)
                }else{
                    errorNetworkHeandler(dispatch,error)
                }
            } else{
                errorNetworkHeandler(dispatch,error as Error)
            }
        }
    }
}
type ActionsForThunkType = SetTodolistsACActionType | AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType | ChangeAppStatusActionType
type DispatchThunkType = Dispatch<ActionsForThunkType>