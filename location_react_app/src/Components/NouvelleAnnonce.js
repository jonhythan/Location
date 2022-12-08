import React from 'react'
import {useState, useEffect} from 'react';

const NouvelleAnnonce = () => {
    const [formState, setFormState]=useState({
        titre : '',
        categorie : '',
        etat: '', 
        description:'',


    })
    useEffect(()=>{
        console.log(formState);
    })

  return (
    <div>
        <div className='header'>Header</div>
        <div className=''>
            <div className='div-after-header'>
                <div className='container container-nouvelle-annonce '>
                    <h4 className='text-center text-secondary'>Nouvelle annonce</h4>
                    <div className='row px-5 p-3'>
                        <div className='col-1'>Titre : </div>
                        <input type="text" className='col-11' onChange={e=>setFormState({...formState, titre : e.target.value})}></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <div className='col-3'>
                            <label >Catégorie : </label>
                            <span className='px-3'>
                                <select>
                                    <option>option 1</option>
                                </select>
                            </span>
                        </div>
                        <div className='col-3'>
                            <label>État:</label>
                            <span className='px-3'>
                                <select>
                                    <option >option1</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1' >Image :</label>
                        <input type="file"  accept="image/PNG" className='col-3'></input>
                    </div>
                    <div className='row px-5 p-3'>
                        <div className='col-1'></div>
                        <canvas className='col-1' width="120px" height="120px"></canvas>
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-2'>Description :</label>
                        <textarea className='col'></textarea>                        
                    </div>
                    <div className='row px-5 p-3'>
                        <label className='col-1'>Prix :</label>
                        <div className='col'>
                            <input type="number" step="0.01" placeholder='$' min={0}/>
                            <span>$&nbsp;\&nbsp;</span>
                            <input type="number" step="1"/> &nbsp;
                            <select>
                                <option>Heure</option>
                                <option>Jour</option>
                                <option>Semaine</option>
                            </select>&nbsp;
                            
                        </div>

                    </div>
                    <div className="row px-5 p-3 justify-content-center">
                        <input type="submit" value="Sauvegarder" className='col-2 btn btn-primary ' />&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="Annuler" className='col-2 btn btn-danger ' />
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default NouvelleAnnonce