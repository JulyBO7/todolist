import { TaskStatuses } from "../../../common/enums"
import { instanse } from "../../../common/instance"
import { BaseResponse } from "../../../common/types"

export const taskApi = {
    setTasks (todolistId: string){
        return instanse.get<SetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTaskTC (todolistId: string, payload: {title: string}){
        return instanse.post<BaseResponse<{item: ItemTaskType}>>(`todo-lists/${todolistId}/tasks`, payload)
    }, 
    updateTask(todolistId: string, taskId: string, payload: TaskForUpdateType ){
        return instanse.put<BaseResponse<{item: ItemTaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
    }, 
    deleteTask(todolistId: string, taskId: string){
        return instanse.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type ItemTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todolistId: string
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