import { React, useState, useEffect } from 'react'



const ProfiStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  const activeEditMode = () => {
    setEditMode(true)
  }

  const deactiveEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activeEditMode}>{status || "No status..."}</span>
        </div>
      }
      {editMode &&
        <div>
          <input onChange={onStatusChange} autoFocus onBlur={deactiveEditMode} value={status} />
        </div>
      }
    </div>
  )

}



export default ProfiStatusWithHooks;