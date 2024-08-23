import { instanse } from '../../../common/instance'
import { BaseResponse } from '../../../common/types'

export const todolistApi = {
    set (){
        return instanse.get<Todolist[]>('todo-lists')
    },
    addTodo(payload: {title: string}){
        return instanse.post<BaseResponse<{item: Todolist}>>('todo-lists',payload)
    },
    removeTodo(id: string){
        return instanse.delete<BaseResponse>(`todo-lists/${id}`)
    },
    updateTodo(id: string, payload: {title: string}){
        return instanse.put<BaseResponse<Todolist>>(`todo-lists/${id}`, payload)
    }
}

export type Todolist = {
    id: string
    title: string
    addedDate: Date
    order: number
}