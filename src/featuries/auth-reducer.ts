import { Dispatch } from "redux"
import { autnApi } from "../api/todolistApi"
import { ChangeAppStatusActionType, changeAppStatusAC } from "../state/appReducer"
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil"
import { AxiosError } from "axios"

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
    return (dispatch: Dispatch<ChangeIsLoggedInActionType | ChangeAppStatusActionType>)=> {
        dispatch(changeAppStatusAC('loading'))
        autnApi.me()
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                dispatch(changeAppStatusAC('succeeded'))
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
    return (dispatch: Dispatch<ChangeIsLoggedInActionType | ChangeAppStatusActionType>)=> {
        dispatch(changeAppStatusAC('loading'))
        autnApi.logIn(form)
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
                dispatch(changeAppStatusAC('succeeded'))
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
    return (dispatch: Dispatch<ChangeIsLoggedInActionType | ChangeAppStatusActionType>)=> {
        dispatch(changeAppStatusAC('loading'))
        autnApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(false))
                dispatch(changeAppStatusAC('succeeded'))
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


