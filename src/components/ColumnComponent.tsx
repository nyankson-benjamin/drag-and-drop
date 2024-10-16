import DeleteIcon from "../assets/DeleteIcon";
import { columnProp } from "../types/types";
import { useStore } from "../store/store";
import InputField from "./InputField";
import Button from "./Button";
import TasksContainer from "./TasksContainer";
import useColumnsSortable from "../hooks/useColumnsSortable";
import PlusIcon from "../assets/PlusIcon";
import { useState } from "react";
export default function ColumnsComponent({ column }: Readonly<columnProp>) {
  const { removeColumn } = useStore();
  const [isMouseActive, setIsMouseActive] = useState(false)

const {
  setNodeRef,
  attributes,
  listeners,
  setEditMode,
  isDragging,
  style,
  title,
  setTitle,
  currentTasks,
  addToTasks,
  editMode

} = useColumnsSortable(column)
  if(isDragging){

    return (
      <div  ref={setNodeRef}
      style={style} className="
      bg-columnBg
      w-[350px]
      h-[500px]
      rounded-md
      max-h-[500px]
      flex
      flex-col
      border-rose-500
      border
      "></div>
    )
  }

    return (
      <div
        className="
      bg-columnBg
      w-[350px]
      h-[500px]
      rounded-md
      max-h-[500px]
      flex
      flex-col
      "
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseOver={()=>setIsMouseActive(true)}
      onMouseLeave={()=>setIsMouseActive(false)}
      >
        {/* column title */}
        <div className="cursor-grab bg-mainBg h-[60px] text-lg rounded-md p-3 font-bold border-columnBg rounded-b-none flex items-center justify-between">
          <div className="flex gap-2 cursor-pointer" onClick={()=>setEditMode(true)}>
            <section className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBg">
              {currentTasks.length}
            </section>
            {editMode && <InputField 
            value={title} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
            onBlur={()=>setEditMode(false)}
            onKeyDown={(e)=>{
              if(e.key !=="Enter") return;
              setEditMode(false)
            }}
            />}
            { !editMode && title}
          </div>
         {isMouseActive && <DeleteIcon handleDelete={() => removeColumn(column.id)} />}
        </div>
        {/* column task container */}
        <section
          className="
  flex flex-grow overflow-auto
  "
        >
          <TasksContainer tasks={currentTasks}/>
        </section>
  
        <footer>
          <Button text="Add task" onSubmit={addToTasks} styles="btnTasks">
            <PlusIcon/>
          </Button>
        </footer>
      </div>
    );
}
