import {ResponseType} from './../api/todolistApi'
import { AppDispatch } from "../state/store"
import { appActions } from "../state/appReducer"
import { Axios, AxiosError, isAxiosError } from 'axios'


export const errorAppServerHeandler = (dispatch: any, error:ResponseType )=>{
    if (error.messages.length){
        dispatch(appActions.setAppErrorAC({error: error.messages[0]}))
    } else{
        dispatch(appActions.setAppErrorAC({error: 'Some error'}))
    }
    dispatch(appActions.changeAppStatusAC({status: 'failed'}))
}
export const errorNetworkHeandler = (dispatch: any , error: {message: string} )=>{
    if(isAxiosError(error)){
        if (error.response?.data){
            dispatch(appActions.setAppErrorAC({error: error.response.data}))
        } else{
            dispatch(appActions.setAppErrorAC({error: error.message}))
        }
    } else{
        dispatch(appActions.setAppErrorAC({error: error.message}))
    }
        dispatch(appActions.changeAppStatusAC({status: 'failed'}))
}

