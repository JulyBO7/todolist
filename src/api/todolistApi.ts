import axios from "axios";

const settings = { baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true}
const instanse = axios.create(settings)

export const todolistApi = {
    set (){
        return instanse.get<TodolistFromServerType[]>('todo-lists')
    },
    addTodo(payload: {title: string}){
        return instanse.post<ResponseType<{item: TodolistFromServerType}>>('todo-lists',payload)
    },
    removeTodo(id: string){
        return instanse.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodo(id: string, payload: {title: string}){
        return instanse.put<ResponseType<TodolistFromServerType>>(`todo-lists/${id}`, payload)
    }
}
export const taskApi = {
    setTasks (todolistId: string){
        return instanse.get<SetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask (todolistId: string, payload: {title: string}){
        return instanse.post<ResponseType<{item: ItemTaskType}>>(`todo-lists/${todolistId}/tasks`, payload)
    }, 
    updateTask(todolistId: string, taskId: string, payload: TaskForUpdateType ){
        return instanse.put<ResponseType<{item: ItemTaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
    }, 
    deleteTask(todolistId: string, taskId: string){
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
export const autnApi = {
    me(){
        return instanse.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    }
}
export type TodolistFromServerType = {
    id: string
    title: string
    addedDate: Date
    order: number
}
export type ResponseType<D={}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1, 
    Completed = 2, 
    Draft = 3
}
export type ItemTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    addedDate: Date
    order: number
}
type SetTasksResponseType = {
    items: ItemTaskType[]
    totalCount: number
    error: string
}
export type TaskForUpdateType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: Date
    deadline: Date
}