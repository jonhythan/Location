import React, {Component} from 'react'
import {useState, setState, useEffect, useRef} from 'react';
import logo from '../logo.svg'
import { useSearchParams } from "react-router-dom";

class NouveauSignalement extends Component {
    constructor() {
        super();
        this.state = {
            selectedReason: 'Cet annonce est répétitive',
            confirmation: ''
        };
        this.handleRaison = this.handleRaison.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }

    handleRaison = (event) => {
        //if (event.target.value !== 'autre') {

        //}
        console.log("event=" + event.target.value);
        this.setState({
            selectedReason: event.target.value
        });
        console.log("selected raison=" + this.state.selectedReason);
    };
    handleAutreRaison = (event) => {
        this.setState({
            selectedReason: "autre: " + event.target.value
        });
    }
    creerSignalement = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "membreUtilisateur": {
                        "utilisateurId": 3
                    },
                    "annonce": {
                        "id": 4
                    },
                    "administrateur": null,
                    "raison": this.state.selectedReason
                }
            )
        }
        console.log(requestOptions);
        fetch('http://localhost:8080/signalement', requestOptions)
            .then(() => this.setState({confirmation: "Signalement fait"}))
            .catch((error) => this.setState({confirmation: "Not Successed : " + error}))
            .finally(window.setTimeout(window.location.reload(), 1000));

    };

    render() {

        return (
            <div className='div_signalement shadow p-3 mb-5 rounded' style={{display: this.props.displaying}}>
                <form onSubmit={this.creerSignalement}>
                    <div className=''>
                        <div className='div-after-header'>
                            <div className='container container-nouveau-signalement '>
                                <h4 className='text-center text-secondary'>Signaler cette annonce... Indiquez
                                    pourquoi: </h4>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="raison" id="repetitive"
                                           value="Cette annonce est répétitive"
                                           checked={this.state.selectedReason === 'Cette annonce est répétitive'}
                                           onChange={this.handleRaison}/>
                                    <label className="form-check-label" htmlFor="repetitive">
                                        Cet annonce est répétitive
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="raison" id="fausse"
                                           value="Fausse information"
                                           checked={this.state.selectedReason === 'Fausse information'}
                                           onChange={this.handleRaison}/>
                                    <label className="form-check-label" htmlFor="fausse">
                                        Fausse information
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="raison" id="fraude"
                                           value="Fraude" checked={this.state.selectedReason === 'Fraude'}
                                           onChange={this.handleRaison}/>
                                    <label className="form-check-label" htmlFor="fraude">
                                        Fraude
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="raison" id="autre"
                                           value="autre" checked={this.state.selectedReason.substring(0, 5) === 'autre'}
                                           onChange={this.handleRaison}/>
                                    <label className="form-check-label" htmlFor="autre">
                                        Autre
                                    </label>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" id="comment"
                                              disabled={this.state.selectedReason.substring(0, 5) !== 'autre'}
                                              onChange={this.handleAutreRaison}></textarea>
                                </div>
                                <div className="row px-5 p-3 justify-content-center">
                                    <button type="button" onClick={() => window.location.reload()}
                                            className="col-3 btn btn-secondary mx-3">Annuler
                                    </button>
                                    <input type="submit" value="SIGNALEZ" className='col-3 btn btn-primary '/>
                                </div>
                                <div className="row px-5 p-3 justify-content-center">
                                    <h4>{this.state.confirmation}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default NouveauSignalement