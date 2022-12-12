import React, {useState} from 'react'

const BarreCategories = () => {
    const [categories, setCategories]=useState([])

    useState(()=>{
        const requestOptions={
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch('http://localhost:8080/categories', requestOptions)
        .then(response => response.json())
        .then(data=>{
            setCategories(data);
        })
    })

    
  return (
    <div className='BarreCategories'>
        <ul className='list-group'>
            {categories.map((c)=>(
                <li className='list-group-item' key={c.id}>{c.nom}</li>
            ))}

        </ul>
    </div>
  )
}

export default BarreCategories