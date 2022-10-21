import React, { ChangeEvent,FormEvent,MouseEvent, useState } from "react"
import Task from "./Task"
import "../styles/todoApp.css"

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
    const value = e.target.value

      setTitle(value)

    
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

  const handleUpdate = (id:string, value:string) =>{
    const temp = [...tasks]
    const item = temp.find(item => item.id == id)
    if (item) {
      item.title = value
      setTasks(temp)
    }
    
  }

  const handleDelete = (id:string) =>{
    const temp = tasks.filter(item => item.id != id)
    console.log(temp)
    setTasks(temp)
  }
 
  return (
    <>
      <div >
        <form action="" >
          <input type="text"  onChange={handleChange} value={title}/>
          <input type="submit" value="Create"  onClick={handleSubmit}/>
        </form>
      </div>
      <div className="listContainer">
        {
          tasks.map(({title,id,completed}) => (
            <Task id= {id} title = {title} completed = {completed} onUpdate={handleUpdate} onDelete={handleDelete}/>
          ))
        }
      </div>
    </>
  )
}

export default TodoApp