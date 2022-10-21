import { MouseEvent,ChangeEvent, FormEvent, useState } from "react"

interface Props  {
  id: string,
  title: string,
  completed: boolean,
 
  onDelete:(id:string) => void
}

const Task = (props: Props)  => {
  return (
    <div className="task" >
      {isEdit ? <FormEdit}/> : <TaskElement/> }
    </div>
  )
}
const TaskElement = (props:Props) =>{ 
  return (
    <div className="taskInfo" key={props.id}>
      {props.id} - {props.title} <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  )
}

const FormEdit = (props: {title:string, id:string,  onUpdate:(id: string, value: string) => void, isEdit:boolean}) =>{
    
  const [update, setUpdate] = useState(props.title)
    
  const [isEdit, setIsEdit] = useState(false)
  
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setUpdate(e.target.value)
  }

  const handleClick = () =>{ 
    props.onUpdate(props.id, update)
    setIsEdit(false)
  }

  return (
    <form className="taskUpdateForm" onSubmit={handleSubmit}>
      <input type="text" className="taskInput" onChange={handleChange} value={update}/>
      <button  className="button" onClick={handleClick}>Update </button>
    </form>
  )
}

export default Task