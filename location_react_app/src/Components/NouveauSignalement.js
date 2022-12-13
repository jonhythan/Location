import React, { Component } from 'react'
import {useState,setState, useEffect, useRef} from 'react';
import logo from '../logo.svg'

class NouveauSignalement extends Component {
  constructor() {
    super();
    this.state = {
      selectedReaon: 'Cet Annonce est répétitive',
      confirmation:''
    };
    this.handleRaison = this.handleRaison.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  handleRaison = (event) => {
    //if (event.target.value !== 'autre') {

    //}
    console.log("event=" + event.target.value);
    this.setState({
      selectedReaon: event.target.value
    });
    console.log("selected raison=" + this.state.selectedReaon);
  };
  handleAutreRaison =(event) => {
    this.setState({
      selectedReaon: "autre:" + event.target.value
    });
  }
  creerSignalement = (e)=>{
    e.preventDefault();
    const requestOptions={
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( 
        {
          "membreUtilisateur": {
            "utilisateurId": 3
          },
          "annonce": {
            "id": 4
          },
          "administrateur": null,
          "raison": this.state.selectedReaon,
          "dateSignalement": "2022-12-08"
        }                
      )
  }
  console.log(requestOptions);
  fetch('http://localhost:8081/signalement', requestOptions)
  .then(() => this.setState({confirmation:"Successed"}))
  .catch((error)=> this.setState({confirmation:"Not Successed : " + error}))

  };

  render() {
  return (    
  <div><form onSubmit={this.creerSignalement}>
    <img src={logo} alt="Logo" style={{marginTop: '3.5rem'}}/>
    <div className=''>
        <div className='div-after-header'>
            <div className='container container-nouveau-signalement '>
                <h4 className='text-center text-secondary'>Signaler cet annonce ... Indiquez pourquoi: </h4>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="raison" id="repetitive" value="Cet Annonce est répétitive" checked={this.state.selectedReaon === 'Cet Annonce est répétitive'} onChange={this.handleRaison}/>
                  <label className="form-check-label" htmlFor="repetitive">
                    Cet Annonce est répétitive
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="raison" id="fausse" value="Fausse information" checked={this.state.selectedReaon === 'Fausse information'} onChange={this.handleRaison}/>
                  <label className="form-check-label" htmlFor="fausse">
                    Fausse information
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="raison" id="fraude" value="fraude" checked={this.state.selectedReaon === 'fraude'} onChange={this.handleRaison}/>
                  <label className="form-check-label" htmlFor="fraude">
                    Fraude
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="raison" id="autre" value="autre" checked={this.state.selectedReaon.substring(0,5) === 'autre'} onChange={this.handleRaison}/>
                  <label className="form-check-label" htmlFor="autre">
                    Autre
                  </label>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="5" id="comment" disabled = {this.state.selectedReaon.substring(0,5) !== 'autre'} onChange={this.handleAutreRaison}></textarea>
                </div>
                <div className="row px-5 p-3 justify-content-center">
                    <input type="submit" value="SIGNALEZ" className='col-2 btn btn-primary ' />
                </div>  
                <div className="row px-5 p-3 justify-content-center">
                    <h4>{this.state.confirmation}</h4>
                </div>
            </div>
        </div>
    </div></form>
</div>
)
}
}
export default NouveauSignalement