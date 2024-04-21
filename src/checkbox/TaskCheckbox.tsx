import Checkbox from "@mui/material/Checkbox"
import { ChangeEvent, memo } from "react"
import { TaskStatuses } from "../api/todolistApi"


type CheckboxPropsType = {
    check: boolean
    changeStatus: (value: TaskStatuses) => void
}

export const TaskCheckbox = memo ((props: CheckboxPropsType) => {
    console.log('Checkbox')
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked ? props.changeStatus(TaskStatuses.Completed) : props.changeStatus(TaskStatuses.New) 
        }       
        return (
        <Checkbox checked={props.check} onChange={onChangeHandler} color="default" />    
    )
}) 