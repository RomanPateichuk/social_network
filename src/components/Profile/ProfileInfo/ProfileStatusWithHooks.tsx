import React, { useState, useEffect, ChangeEvent } from 'react'

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

const ProfiStatusWithHooks: React.FC<PropsType> = (props) => {

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

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <b>Status: </b><span onDoubleClick={activeEditMode}>{status || "No status..."}</span>
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