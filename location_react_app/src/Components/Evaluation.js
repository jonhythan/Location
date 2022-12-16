import React, {useEffect, useState} from 'react'
import {IoPersonCircleOutline} from "react-icons/io5"
import {AiFillStar} from "react-icons/ai"


const Evaluation = (props) => {
    const [note, setNote]=useState(1);
    const [commentaire, setCommentaire]=useState("");
    const [hoverNote, setHoverNote]=useState(1);
    const [displaying, setDisplaying]=useState(props.d)
    const changeColor=(i)=>{
        var elements = document.getElementsByClassName("aifillstar")
        for(let j=0; j<elements.length; j++){
            if(j<i) elements[j].style.color="gold";
            else elements[j].style.color="black";
            
        }
    }

    useEffect(()=>{
        setDisplaying(props.d)
    }, [props.d, props.annonceId, props.membreId])

    const sendEvaluation=(e)=>{
        e.preventDefault();
        const requestOptions={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "annonceId": props.annonceId,
                "membreId": props.membreId,
                "commentaire": commentaire,
                "note": note
            })
        }
        fetch('http://localhost:8080/evaluation/insert', requestOptions)
            .then(response => window.location.reload());
    }
    return (
        <div style={{display: displaying}} className="">
            <div  className="div_evaluation d-flex flex-column shadow p-3 mb-5 bg-body rounded">
                <div className='d-flex'>
                    <div>
                        <IoPersonCircleOutline style={{fontSize: "3em"}}/>
                    </div>
                    <span style={{fontSize: "2em"}}><b>Invité</b></span>
                </div>
                <div style={{fontSize:"1.5em"}} className="d-flex align-self-center justify-content-center">
                    <div className='d-flex align-self-center justify-content-center'>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(1)} onMouseEnter={()=>{setHoverNote(1); changeColor(1)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(2)} onMouseEnter={()=>{setHoverNote(2); changeColor(2)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(3)} onMouseEnter={()=>{setHoverNote(3); changeColor(3)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(4)} onMouseEnter={()=>{setHoverNote(4); changeColor(4)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(5)} onMouseEnter={()=>{setHoverNote(5); changeColor(5)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(6)} onMouseEnter={()=>{setHoverNote(6); changeColor(6)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(7)} onMouseEnter={()=>{setHoverNote(7); changeColor(7)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(8)} onMouseEnter={()=>{setHoverNote(8); changeColor(8)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(9)} onMouseEnter={()=>{setHoverNote(9); changeColor(9)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                        <AiFillStar className='aifillstar' onClick={()=>setNote(10)} onMouseEnter={()=>{setHoverNote(10); changeColor(10)}} onMouseLeave={()=>{setHoverNote(note); changeColor(note)}}/>
                    </div>
                        &nbsp;{hoverNote}/10
                </div>
                <div className="form-floating">
                    <textarea required className="form-control" placeholder="Leave a comment here" style={{height: "100px"}} onChange={(e)=>setCommentaire(e.target.value)}></textarea>
                    <label >Mon commentaire</label>
                </div>
                <div className='py-2 d-flex justify-content-end'> 
                    <button type="button" onClick={()=>window.location.reload()} className="btn btn-secondary mx-3">Annuler</button>
                    <button type="button" className="btn btn-success" onClick={e=>sendEvaluation(e)}>Envoyer</button>
                </div>
            </div>
        </div>
  )
}

export default Evaluation