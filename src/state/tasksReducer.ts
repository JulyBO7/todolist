import { TasksType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACActionType } from "./todolistsReducer";
import { Dispatch } from "redux";
import { ItemTaskType, TaskStatuses, taskApi } from "../api/todolistApi";
import { AppRootStateType } from "./store";
import { ChangeAppStatusActionType, changeAppStatusAC } from "./appReducer";

type TaskReducerActionType =  AddTaskACType 
                            | RemoveTaskACType 
                            | ChangeTaskStatusACType 
                            | ChangeTaskTitleACType 
                            | AddTodolistActionType
                            | SetTodolistsAC
                            | RemoveTodolistActionType
                            | SetTodolistsACActionType

const initialState: TasksType = {}

export const tasksReducer = (state = initialState , action: TaskReducerActionType): TasksType  => {
    switch (action.type) {
        case 'ADD-TASK': 
           return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]}
        case 'REMOVE-TASK': 
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((el:ItemTaskType) => el.id !== action.payload.taskId) }
        case 'CHANGE-TASK-STATUS': 
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: ItemTaskType) => el.id === action.payload.taskId
                    ? { ...el, status: action.payload.newStatus} : el)}
        case 'CHANGE-TASK-TITLE': 
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: ItemTaskType) => el.id === action.payload.taskId
                    ? { ...el, title: action.payload.newTitleValue } : el)}
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todo.id]: []}
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case 'SET-TODOLISTS':
            let newTasksState = {} as TasksType
            action.payload.todos.forEach(todos => {
                newTasksState[todos.id] = []
            }
            )
            return newTasksState
        case 'SET-TASKS':
            const newTasks={...state, [action.todolistId]: action.tasks} 
            return newTasks
        default: return state
    }
}
type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type SetTodolistsAC = ReturnType<typeof setTodolistsAC>


export const addTaskAC = (todolistId: string, task: ItemTaskType) => ({type: 'ADD-TASK',payload: {todolistId,task,}} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK',payload: {todolistId: todolistId,taskId,}} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: TaskStatuses) => ({type: 'CHANGE-TASK-STATUS',payload: {todolistId,taskId,newStatus}} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitleValue: string) =>({type: 'CHANGE-TASK-TITLE',payload: {todolistId,taskId,newTitleValue}} as const)
export const setTodolistsAC = (todolistId: string,tasks:ItemTaskType[])=> ({type: 'SET-TASKS', todolistId, tasks} as const)

export const setTasksTC = (todolistId: string)=> {
    return async (dispatch: DispatchThunkType)=> {
        dispatch(changeAppStatusAC('loading'))
        let res = await taskApi.setTasks(todolistId)
        dispatch(setTodolistsAC(todolistId, res.data.items))
        dispatch(changeAppStatusAC('succeeded'))
    }
}
export const addTasksTC = (todolistId: string, title: string)=> {
    return async (dispatch: DispatchThunkType)=> {
        const taskForRequest = {title}
        dispatch(changeAppStatusAC('loading'))
        let res = await taskApi.addTask(todolistId, taskForRequest)
        dispatch(addTaskAC(todolistId, res.data.data.item))
        dispatch(changeAppStatusAC('succeeded'))
    }
}
export const removeTaskTC = (todolistId: string, taskId: string)=> {
    return async (dispatch: DispatchThunkType)=> {
        dispatch(changeAppStatusAC('loading'))
        let res = await taskApi.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(changeAppStatusAC('succeeded'))
    }
}
export const changeTaskStatusTC = (todolistId:string, taskId:string,newStatus:TaskStatuses)=> {
    return async (dispatch: DispatchThunkType, getState: ()=> AppRootStateType)=> {
        const taskForRequest = getState().tasks[todolistId].find(task=> taskId === task.id)
        if (taskForRequest){
            const newTaskForRequest = { title: taskForRequest.title,
                                        description:taskForRequest.description,
                                        status: newStatus,
                                        priority: taskForRequest.priority,
                                        startDate: taskForRequest.startDate,
                                        deadline: taskForRequest.deadline
                                    }
            dispatch(changeAppStatusAC('loading'))                        
            let res = await taskApi.updateTask(todolistId,taskId, newTaskForRequest)
            if(res.data.resultCode ===0){
                dispatch(changeTaskStatusAC(todolistId,taskId,newStatus))
                dispatch(changeAppStatusAC('succeeded'))
            }
        }
       
    }
}
export const changeTaskTitleTC = (todolistId:string, taskId:string, title: string)=> {
    return async (dispatch: DispatchThunkType, getState: ()=> AppRootStateType)=> {
        const taskForRequest = getState().tasks[todolistId].find(task=> taskId === task.id)
        if (taskForRequest){
            const newTaskForRequest = { title,
                                        description:taskForRequest.description,
                                        status: taskForRequest.status,
                                        priority: taskForRequest.priority,
                                        startDate: taskForRequest.startDate,
                                        deadline: taskForRequest.deadline
                                    }
            dispatch(changeAppStatusAC('loading'))                        
            let res = await taskApi.updateTask(todolistId,taskId, newTaskForRequest)
            if(res.data.resultCode ===0){
                dispatch(changeTaskTitleAC(todolistId,taskId,title))
                dispatch(changeAppStatusAC('succeeded'))
            }
        }
       
    }
}
type DispatchThunkType = Dispatch<SetTodolistsAC | AddTaskACType | ChangeTaskStatusACType |ChangeTaskTitleACType| RemoveTaskACType | ChangeAppStatusActionType>