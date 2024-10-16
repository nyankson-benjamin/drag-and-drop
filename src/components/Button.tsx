import { BtnProps } from "../types/types";

export default function Button({
  text,
  children,
  onSubmit,
  styles,
}: Readonly<BtnProps>) {
  const basicStyles = "w-full"
  const btnStyles = styles || "flex items-center  justify-center  gap-4 h-[60px]  bg-mainBg   border-2  border-columnBg  ring-rose-500  p-4  hover:ring-2  rounded-lg  ";
  return (
    <button className={btnStyles + " " + basicStyles} onClick={onSubmit}>
      {children} {text}
    </button>
  );
}
