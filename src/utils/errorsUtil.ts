import {ResponseType} from './../api/todolistApi'
import { AppDispatch } from "../state/store"
import { appActions } from "../state/appReducer"


export const errorAppServerHeandler = (dispatch: AppDispatch, error:ResponseType )=>{
    if (error.messages.length){
        dispatch(appActions.setAppErrorAC({error: error.messages[0]}))
    } else{
        dispatch(appActions.setAppErrorAC({error: 'Some error'}))
    }
    dispatch(appActions.changeAppStatusAC({status: 'failed'}))
}
export const errorNetworkHeandler = (dispatch: AppDispatch , error: {message: string} )=>{
        dispatch(appActions.setAppErrorAC({error: error.message}))
        dispatch(appActions.changeAppStatusAC({status: 'failed'}))
}

