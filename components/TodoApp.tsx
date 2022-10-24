
import React, { ChangeEvent,FormEvent, useState } from "react"
import Task, { TaskModel } from "./Task"

import styles from "./todoApp.module.css"
interface TaskItem {
  id: string,
  title: string,
  completed: boolean,
  onUpdate?:(id: string, value: string) => void
  onDelete?:(id:string) => void

}
const TodoApp = () => {

  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState<TaskItem[]>([])

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e:FormEvent<HTMLInputElement>) =>{
    e.preventDefault()

    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      title:title, 
      completed:false
    }

    if(title != ""){
      setTasks([...tasks, newTask])
      setTitle("")
    }else{
      alert("ingrese tarea")
    }
  }

  const onTaskUpdate = (task: TaskModel) =>{
    setTasks(prev => prev.map(item => item.id === task.id ? task : item))
  }

  const onTaskDelete = (task: TaskModel) =>{
    const temp = tasks.filter(item => item.id != task.id)
    setTasks(temp)
  }
 
  return (
    <div className={styles.taskContainer}>
      <div>
        <form action="" className={styles.taskCreateForm}>
          <input type="text" onChange={handleChange} value={title} className={styles.input}/>
          <input type="submit" value="Create"  onClick={handleSubmit} className={styles.button}/>
        </form>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task, key) => (
          <Task key={key} task={task} onDelete={onTaskDelete} onUpdate={onTaskUpdate} />
        ))}
      </div>
    </div>
  )
}

export default TodoApp