import { FormEvent, useState } from "react"
import styles from "./task.module.css"

export type TaskModel = {
  id: string,
  title: string,
  completed: boolean,
}

interface Props  {
  task: TaskModel
  onDelete: (task: TaskModel) => void
  onUpdate: (task: TaskModel) => void
}

const Task = ({ task, onDelete, onUpdate }:Props)  => {

  const [isEditing, setIsEditing] = useState(false)

  if (!isEditing) {
    return (
      <div className={styles.taskInfo}>
        {task.title} <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(task)}>Delete</button>
      </div>
    )
  }
  
  const handleUpdate = (task: TaskModel) => {
    onUpdate(task)
    setIsEditing(false)
  }

  return <FormEdit task={task} onUpdate={handleUpdate} />
}

type FormEditProps = Omit<Props, 'onDelete'> & {
  onUpdate?: (task: Props['task']) => void
}

const FormEdit = ({ task, onUpdate }: FormEditProps) =>{
  const [title, setTitle] = useState(task.title)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    onUpdate?.({ ...task, title })
  }

  return (
    <form className={styles.taskUpdateForm} onSubmit={handleSubmit}>
      <input type="text" className={styles.input} onChange={event => setTitle(event.target.value)} value={title}/>
      <button  className={styles.button}>Update</button>
    </form>
  )
}

export default Task