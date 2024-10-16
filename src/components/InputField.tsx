import { InputProps } from "../types/types";

export default function InputField({value, onChange, onBlur, onKeyDown}:Readonly<InputProps>) {
  return (
    <div>
        <input autoFocus value={value} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown}
        className="
        p-1 rounded-md
        focus:border-rose-500
        border
        bg-black
        outline-none
        "
        />
    </div>
  )
}
