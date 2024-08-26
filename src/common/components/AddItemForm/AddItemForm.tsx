import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { unwrapResult } from "@reduxjs/toolkit";
import { ChangeEvent, memo, useState } from "react";


type AddItemFormTypeProps = {
    addItem: (titleItem: string)=> Promise<any>
}

export const AddItemForm = memo ((props: AddItemFormTypeProps) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            if (e.currentTarget.value.length <=100) setError(null)
    };
    const onClickButton = async () => {
        if (title.trim()) {
            props.addItem(title)
                .then(unwrapResult)
                .then(() => {
                    setTitle('')
                    setError('')
                })
                .catch((err) => {
                    setError(err.messages[0])
                })
        } else {
            setError('Title is required')
        }
    }
    const onClickEnter = (e: any) => {
        e.key === 'Enter' && onClickButton()
    }
    return (
            <div>
                <TextField  variant="standard" 
                            color="success"
                            label="Enter a title"
                            value={title}
                            error={!!error}
                            helperText={error}
                            onChange={onChangeInput}
                            onKeyDown={onClickEnter} />

                <Button size="small" variant="outlined" onClick={onClickButton} color="success"> + </Button>
            </div>
               
    )
})