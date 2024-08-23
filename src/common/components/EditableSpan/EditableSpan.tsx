import IconButton from "@mui/material/IconButton"
import { memo, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from "@mui/material/TextField"


type EditableSpanPropsType = {
    title: string
    todolistId: string
    changeTitle: (newTitle: string) => void
    removeItem: () => void
}


export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')

    const [editMode, setEditmode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onDoubleClickHeandler = () => {
        setEditmode(!editMode)
    }
    const onBlurHeandler = () => {
        setEditmode(!editMode)
        if (title.trim()) {
            props.changeTitle(title)
        }
    }
    return (
        <>
            {editMode
                ? 
                <TextField  variant="standard" 
                            color="success"
                            autoFocus
                            label="Enter a title"
                            value={title}
                            onBlur={onBlurHeandler}
                            onChange={(event) => setTitle(event.currentTarget.value)} />
              
                : <span onDoubleClick={onDoubleClickHeandler}> {props.title} </span>}

            <IconButton aria-label="delete" onClick={props.removeItem}>
                <DeleteIcon />
            </IconButton>
        </>

    )
})

