import Checkbox from "@mui/material/Checkbox"
import { ChangeEvent, memo } from "react"


type CheckboxPropsType = {
    check: boolean
    changeStatus: (value: boolean) => void
}

export const TaskCheckbox = memo ((props: CheckboxPropsType) => {
    console.log('Checkbox')
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(e.currentTarget.checked)
    }
    return (
        <Checkbox checked={props.check} onChange={onChangeHandler} color="default" />    
    )
}) 