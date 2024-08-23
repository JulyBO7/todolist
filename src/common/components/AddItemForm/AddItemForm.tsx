import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, memo, useState } from "react";


type AddItemFormTypeProps = {
    addItem: (titleItem: string)=> void
}

export const AddItemForm = memo ((props: AddItemFormTypeProps) => {
    
    console.log('AddItemForm')

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHeandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onClickBtnHeandler = () => {
        if (title.trim()){
            props.addItem(title)
            setTitle('')
            
        } else {
            setError('Title is required')
        }
        
    }
    const onClickEnterHeandler = (e: any) => {
        e.key === 'Enter' && onClickBtnHeandler()
    }
    // const isaddTaskTCBtnDisabled: boolean = title.length > 20 || title.length === 0

    return (
            <div>
                <TextField  variant="standard" 
                            color="success"
                            label="Enter a title"
                            value={title}
                            error={!!error}
                            helperText={error}
                            onChange={onChangeInputHeandler}
                            onKeyDown={onClickEnterHeandler} />

                <Button size="small" variant="outlined" onClick={onClickBtnHeandler} color="success"> + </Button>
            </div>
               
    )
})