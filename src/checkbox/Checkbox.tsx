import { ChangeEvent } from "react"

type CheckboxPropsType = {
    check: boolean
    callback: (value: boolean) => void
}

export const Checkbox = (props: CheckboxPropsType) => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }
    return (
        <>
            <input type="checkbox" checked={props.check} onChange={changeHandler} />
        </>
    )
}