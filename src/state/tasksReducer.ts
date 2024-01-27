import { v1 } from "uuid";
import { TasksType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolistsReducer";

type TaskReducerActionType =  AddTaskACType 
                            | RemoveTaskACType 
                            | ChangeTaskStatusACType 
                            | ChangeTaskTitleACType 
                            | AddTodolistActionType
                            |RemoveTodolistActionType

const initialState: TasksType = {}

export const tasksReducer = (state = initialState , action: TaskReducerActionType): TasksType  => {
    switch (action.type) {
        case 'ADD-TASK': 
            const task = {
                id: v1(),
                title: action.payload.titleNewTask,
                isDone: false
            }
            return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId], task] }
        
        case 'REMOVE-TASK': 
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((el: any) => el.id !== action.payload.taskId) }
        
        case 'CHANGE-TASK-STATUS': 
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: any) => el.id === action.payload.taskId
                    ? { ...el, isDone: action.payload.newIsDoneValue }
                    : el)
            }
        
        case 'CHANGE-TASK-TITLE': 
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: any) => el.id === action.payload.taskId
                    ? { ...el, title: action.payload.newTitleValue }
                    : el)
            }
        
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolistId]: []}
            
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState

        default: return state
    }
}



type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (todolistId: string, titleNewTask: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            titleNewTask,
        }
    } as const
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId: todolistId,
            taskId,
        }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId: todolistId,
            taskId,
            newIsDoneValue: newIsDoneValue
        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitleValue: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitleValue
        }
    } as const
}


