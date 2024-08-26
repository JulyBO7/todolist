import { bindActionCreators } from "redux"
import { useMemo } from "react"
import { useAppDispatch } from "./useAppDispatch"

export const useActions = (actionCreators: any) => {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(actionCreators, dispatch), [])
}