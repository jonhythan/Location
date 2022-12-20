import React, {Component} from "react";

// import "./Login.css"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import logo from '../logo.svg'

class LoginPage extends Component {

    state = {
        passwordType: "password",
    };

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    };

    handlePasswordChange = (event) => {
        this.setState({
            passwordType: event.target.value,
        })
    }

    togglePassword = () => {
        if (this.state.passwordType === "password") {
            this.setState({
                passwordType: "text",
            })
        } else {
            this.setState({
                passwordType: "password",
            })
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            "courriel": email,
            "password": password,
            "role": null,
            "token": null
        }


        console.log(email, password);

        fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-type": "application/json",
            },
        }).then((res) => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        }).then((resData) => {
            this.setState({data: resData})
            sessionStorage.setItem("token", resData.data.token)
            sessionStorage.setItem("prenom", resData.data.prenom)
            sessionStorage.setItem("userId", resData.data.userId)
            sessionStorage.setItem("role", resData.data.role)

            if (resData.data.token) {
                this.context.login(
                    resData.data.token,
                    resData.data.userId,
                    resData.data.tokenExpiration
                );
            }
            console.log("token------------");
            console.log(resData.data.token);
            console.log("userId------------");
            console.log(resData.data.userId);
            console.log("resData.data------------");
            console.log(resData.data);
            console.log("data------------");
            console.log(resData);
            window.location.replace("/")

        }).catch((err) => {
            console.log(err)
        });
    };

    render() {
        if (sessionStorage.getItem("token") != null) {
            if (sessionStorage.getItem("role") === "admin")
            {
                return window.location.replace("/admin");
            }
            return window.location.replace("/");
        }

        return (
            <section className={"vh-75"} style={{backgroundColor: "#D9D9D9", width: "600px", borderRadius: "1rem"}}>
                <div className={"container py-5 h-100"}>
                    <div className={"row d-flex justify-content-center align-items-center h-100"}>
                        {/*<div className={"col-12 col-md-8 col-lg-6 col-xl-5"}>*/}
                        <div className={"col-10"}>
                            <div className={"card shadow-2-strong"} style={{borderRadius: "1rem"}}>
                                <div className={"card-body p-5 text-center"}>
                                    <div className={"text-center"}>
                                        <img src={logo} className={"rounded"} alt="logo"/>
                                    </div>
                                    <h1 className={"mb-5"} style={{letterSpacing: "9px", color: "#354446"}}>Se
                                        connecter</h1>
                                    <form onSubmit={this.submitHandler}>
                                        <div className={"form-outline input-group mb-4"}>
                                            <input className={"form-control form-control-lg"} type={"email"}
                                                   id={"email"}
                                                   ref={this.emailEl} placeholder={"Utilisateur"}/>
                                            <span className={"input-group-text justify-content-center"}
                                                  style={{width: "70px"}}>
                                                <i className={"bi bi-person"}></i>
                                            </span>
                                        </div>
                                        <div className={"form-outline input-group mb-4"}>
                                            <input className={"form-control form-control-lg"}
                                                   type={this.state.passwordType}
                                                   onChange={this.handlePasswordChange}
                                                   id={"password"} ref={this.passwordEl} placeholder={"Mot de passe"}/>
                                            <span className={"input-group-text"}>
                                                <button className={"btn"}
                                                        onClick={this.togglePassword}>
                                                    {this.state.passwordType === "password" ?
                                                        <i className={"bi bi-eye-slash"}></i> :
                                                        <i className={"bi bi-eye"}></i>}
                                                </button>
                                            </span>
                                        </div>
                                        <div className={"d-grid gap-2"}>
                                            <button className={"btn  btn-lg btn-block text-uppercase"} type={"submit"}
                                                    style={{backgroundColor: "#3A5A40", color: "#FFFFFF"}}>Entrer
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginPage;