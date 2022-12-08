import React from 'react'
import { useState ,useEffect} from 'react'

const Test2 = () => {
    const [e1, setE1]=useState('');
    const [e2, setE2]=useState('');

    const f1 = (event)=>{
        setE1(event.target.value);
        setE2({
            
          })
        
    }
    useEffect(()=>{
        console.log(e2);
    })
  return (
    <div>
        <div><input type='text' onChange={e=>f1(e)}></input></div>
        <div>{e2}</div>
    </div>
  )
}

export default Test2