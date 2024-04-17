import { memo } from "react"
import { FilterTaskType } from "../AppWithRedux"
import Button from '@mui/material/Button'


type ButtonType = {
    callback: ()=> void
    filter: string
    title: string
}

export const FilterButton = memo((props: ButtonType) => {
    return (
            <Button size="small"
                color="success"
                onClick={props.callback} 
                variant={props.filter === "active" ? "contained" : "text" }>
                    {props.title}
            </Button>

    )
}
)
   