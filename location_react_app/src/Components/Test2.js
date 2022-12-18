import React from 'react'
import { useState ,useEffect} from 'react'

const Test2 = ({stateChanger, setStateChanger}) => {
  
  return (
    <div>
      {stateChanger?"I am displaying":"I am not displaying"}
      <button onClick={()=>setStateChanger(false)}>Change Etat</button>
    </div>
  )
}

export default Test2