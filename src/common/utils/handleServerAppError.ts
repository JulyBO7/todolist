import {BaseResponse} from '../types'
import { appActions } from "../../app/appReducer"


export const handleServerAppError = (dispatch: any, error:BaseResponse )=>{
    if (error.messages.length){
        dispatch(appActions.setAppErrorAC({error: error.messages[0]}))
    } else{
        dispatch(appActions.setAppErrorAC({error: 'Some error'}))
    }
    dispatch(appActions.changeAppStatusAC({status: 'failed'}))
}
