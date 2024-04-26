
type ActionType = ChangeAppStatusActionType | SetAppErrorActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    appError: null as string | null
}
export const appReducer = (state=initialState, action: ActionType)=> {
    switch(action.type){
        case 'CHANGE-APP-STATUS': 
        return {...state, appStatus: action.status }
        case 'SET-APP-ERROR': 
        return {...state, appError: action.error }
        
        default: return state
    }
}
export const changeAppStatusAC = (status:RequestStatusType)=>({type:'CHANGE-APP-STATUS' as const, status})
export const setAppErrorAC = (error:string | null)=>({type:'SET-APP-ERROR' as const, error})

export type ChangeAppStatusActionType = ReturnType <typeof changeAppStatusAC>
export type SetAppErrorActionType = ReturnType <typeof setAppErrorAC>


