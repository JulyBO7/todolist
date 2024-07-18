import { autnApi } from "../api/todolistApi"
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil"
import { AxiosError } from "axios"
import { AppDispatch } from "../state/store"
import { appActions, appSlice } from "../state/appReducer"

const initialState = {
    isLoggedIn: false
}
type ActionsType = ChangeIsLoggedInActionType
type ChangeIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type FormType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authReducer = (state=initialState, action: ActionsType)=> {
    switch(action.type){
        case 'CHANGE-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default: return state
    }
}
const setIsLoggedInAC = (isLoggedIn: boolean)=> ({type: 'CHANGE-IS-LOGGED-IN', isLoggedIn} as const)

export const setIsLoggedInTC = ()=> {
    return (dispatch: AppDispatch)=> {
        dispatch(appActions.changeAppStatusAC({status: 'loading'}))
        autnApi.me()
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
            } else {
                errorAppServerHeandler(dispatch, res.data)
            }
        })
        .catch((error: AxiosError<{message: string}>) => {
            if (error.response?.data){
                errorNetworkHeandler(dispatch, error.response.data)
            } else{
                errorNetworkHeandler(dispatch, error)
            }
        }
        )
    }
}
export const logInTC = (form: FormType)=> {
    return (dispatch: AppDispatch)=> {
        dispatch(appActions.changeAppStatusAC({status: 'loading'}))
        autnApi.logIn(form)
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
            } else {
                errorAppServerHeandler(dispatch, res.data)
            }
        })
        .catch((error: AxiosError<{message: string}>) => {
            if (error.response?.data){
                errorNetworkHeandler(dispatch, error.response.data)
            } else{
                errorNetworkHeandler(dispatch, error)
            }
        }
        )
    }
}
export const logOutTC = ()=> {
    return (dispatch: AppDispatch)=> {
        dispatch(appActions.changeAppStatusAC({status: 'loading'}))
        autnApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(false))
                dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
            } else {
                errorAppServerHeandler(dispatch, res.data)
            }
        })
        .catch((error: AxiosError<{message: string}>) => {
            if (error.response?.data){
                errorNetworkHeandler(dispatch, error.response.data)
            } else{
                errorNetworkHeandler(dispatch, error)
            }
        }
        )
    }
}


