import { memo } from "react"
import { FilterTaskType } from "../AppWithRedux"

type ButtonType = {
    callback: ()=> void
    filter: string
    title: string
}

export const Button = memo((props: ButtonType) => {
    return (
        <div>
            <button onClick={props.callback} className={props.filter}> {props.title}</button>
        </div>

    )
}
)
   