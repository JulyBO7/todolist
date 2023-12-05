import { TodolistsType } from "../App";

export type TodolistReducerActionType = ChangeFilterActionType | AddTodolistACType | ChangeTodolistTitleACType

export const todolistReducer = (state: Array<TodolistsType>, action: TodolistReducerActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            let todolist = state.find(el => el.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.newFilterValue
                return [...state]
            } else {
                return state
            }
        }
        case 'ADD-TODOLIST': {
            const newTodolist = { id: action.payload.todolistId, title: action.payload.titleItem, filter: 'all' }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)

        }
        default: return state
    }
}


type ChangeFilterActionType = ReturnType <typeof changeFilterAC>
type AddTodolistACType = ReturnType <typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC >

export const changeFilterAC = (todolistId: string, newFilterValue: string) => {
    return { 
        type: 'CHANGE-FILTER', 
        payload: {
            todolistId, 
            newFilterValue
        }
    } as const
}

export const addTodolistAC = (titleItem: string, todolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            titleItem: titleItem,
            todolistId: todolistId
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