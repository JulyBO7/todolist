import { instanse } from "../../../common/instance"
import { BaseResponse } from "../../../common/types"

export const autnApi = {
    me(){
        return instanse.get<BaseResponse<{id: number, email: string, login: string}>>('/auth/me')
    },
    logIn(payload: {email: string, password: string}){
        return instanse.post<BaseResponse<{userId: number}>>('/auth/login', payload)
    },
    logOut(){
        return instanse.delete<BaseResponse>('/auth/login')
    }
}