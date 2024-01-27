import { useState } from "react"


type EditableSpanPropsType = {
    title: string
    todolistId: string
    changeTitle: (newTitle: string)=> void
    removeItem:()=> void 
}


export const EditableSpan = (props: EditableSpanPropsType) => {
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
        <div>
            {editMode
                ? <input    value={title} autoFocus onBlur={onBlurHeandler}
                            onChange={(event) => setTitle(event.currentTarget.value)} />
                : <span onDoubleClick={onDoubleClickHeandler}> {props.title} </span>}

                <button onClick={props.removeItem}> X </button>
        </div>

    )
}

