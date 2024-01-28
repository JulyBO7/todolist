import { ChangeEvent, memo } from "react"

type CheckboxPropsType = {
    check: boolean
    changeStatus: (value: boolean) => void
}

export const Checkbox = memo ((props: CheckboxPropsType) => {
    console.log('Checkbox')
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(e.currentTarget.checked)
    }
    return (
        <>
            <input type="checkbox" checked={props.check} onChange={onChangeHandler} />
        </>
    )
}) 