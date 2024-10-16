import { InputProps } from "../types/types";

export default function InputField({
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
}: Readonly<InputProps>) {
  return (
    <input
      autoFocus
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="
        p-1 rounded-md
        focus:border-rose-500
        border
        bg-black
        outline-none
        "
    />
  );
}
