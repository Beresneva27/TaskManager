import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {IconButton, TextField} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => { 
        if (title.trim() !== "") {
        props.addItem(title);
        setTitle(""); 
        } else {
            setError("Title is required");
        }
    }

    return <div>
    <TextField value={title} 
        variant={'outlined'}
        label={'Type value'}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
    />
    <IconButton onClick={addItem} color={'primary'}>
        <ControlPoint />
    </IconButton>

    {/*error && <div className='error-message'>{error}</div>*/}
    </div>
});