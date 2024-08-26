import {BaseResponse} from '../types'
import { appActions } from "../../app/appReducer"
import { ThunkDispatch } from 'redux-thunk'
import { UnknownAction } from '@reduxjs/toolkit'


export const handleServerAppError = (dispatch: ThunkDispatch<unknown, unknown, UnknownAction>, rejectWithValue: any, data:BaseResponse, isRender: boolean = true )=>{
    if (isRender){
        if (data.messages.length){
            dispatch(appActions.setAppErrorAC({error: data.messages[0]}))
        } else{
            dispatch(appActions.setAppErrorAC({error: 'Some error'}))
        }
    }
    dispatch(appActions.changeAppStatusAC({status: 'failed'}))
    return rejectWithValue(data)
}
