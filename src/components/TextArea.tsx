import {TextAreaProps } from "../types/types";

export default function TextArea({value, onChange, onBlur, onKeyDown, placeholder}:Readonly<TextAreaProps>) {
  return (
    <div>
        <textarea autoFocus value={value} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown} placeholder={placeholder}
        className="
        p-1 rounded-md
        focus:border-rose-500
        border
        bg-black
        outline-none
        w-[100%]
        h-[90%]
        overflow-auto
        "
        />
    </div>
  )
}
