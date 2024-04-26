import { Dispatch } from "redux"
import { ChangeAppStatusActionType, SetAppErrorActionType, changeAppStatusAC, setAppErrorAC } from "../state/appReducer"
import {ResponseType} from './../api/todolistApi'


export const errorAppServerHeandler = (dispatch: Dispatch<SetAppErrorActionType | ChangeAppStatusActionType>, error:ResponseType )=>{
    if (error.messages.length){
        dispatch(setAppErrorAC(error.messages[0]))
    } else{
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(changeAppStatusAC('failed'))
}
export const errorNetworkHeandler = (dispatch: Dispatch<SetAppErrorActionType | ChangeAppStatusActionType>, error: {message: string} )=>{
        dispatch(setAppErrorAC(error.message))
        dispatch(changeAppStatusAC('failed'))
}

