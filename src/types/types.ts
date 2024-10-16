export type Id = string | number
export type columns = {
    id:Id,
    title: string
}

export type ColumnsProps ={
    columns:columns[]
}

export type columnProp={
    column:columns
}

export type BtnProps = {
    text:string,
    onSubmit?:()=>void,
    children?:React.ReactNode,
    styles?:string
}

export type InputProps={
    value:Id,
    onBlur?:()=>void,
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}
export type TextAreaProps={
    value:Id,
    onBlur?:()=>void,
    onChange:(e: React.ChangeEvent<HTMLTextAreaElement>)=>void
    onKeyDown?:(e:React.KeyboardEvent<HTMLTextAreaElement>)=>void
}

export type Task={
    id:Id,
    columnId:Id,
    content:string
}

export type TaskContainerProps ={
    tasks:Task[]
}

export type TaskItemProps={
    task:Task
}