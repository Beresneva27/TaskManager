import React, { ChangeEvent, useState } from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    
    return editMode 
    ? <TextField value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
});
