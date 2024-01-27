import { v1 } from "uuid";
import { TodolistsType } from "../App";

export type TodolistReducerActionType = ChangeFilterActionType | AddTodolistActionType | ChangeTodolistTitleActionType | RemoveTodolistActionType

const initialState: Array<TodolistsType> = []
export const todolistsReducer = (state = initialState, action: TodolistReducerActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const newTodolist = { id: action.payload.todolistId, title: action.payload.titleItem, filter: 'all' }
            return [...state, newTodolist]

        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)

        case 'CHANGE-FILTER':
            let todolist = state.find(el => el.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.newFilterValue
                return [...state]
            } else {
                return state
            }

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.todolistId ? { ...el, title: action.payload.newTitle } : el)

        default: return state
    }
}


export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>


export const addTodolistAC = (titleItem: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            titleItem: titleItem,
            todolistId: v1()
        }

    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }

    } as const
}
export const changeFilterAC = (todolistId: string, newFilterValue: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            newFilterValue
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }

    } as const
}