import React, {Component} from "react";

import "./Login.css"

class LoginPage extends Component {

    state = {
        isLogin: true,
    };

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    };

    switchModeHandler = () => {
        this.setState((prevState) => {
            return {
                isLogin: !prevState.isLogin
            };
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
            
            `
        }

        if (!this.state.isLogin) {
            requestBody = {
                query: `
            
            `
            }
        }

        console.log(email, password);

        fetch("http://localhost:8080/utilisateur", {
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
            console.log(resData);
        })
            .catch((err) => {
                console.log(err)
            });
    };

    render() {
        return (
            <form className={"auth-form"} onClick={this.submitHandler}>
                <div className={"form-control"}>
                    <label htmlFor={"email"}>Utilisateur</label>
                    <input type={"email"} id={"email"} ref={this.emailEl}/>
                </div>
                <div className={"form-control"}>
                    <label htmlFor={"password"}>Mot de passe</label>
                    <input type={"password"} id={"password"} ref={this.passwordEl}/>
                </div>
                <div className={"form-actions"}>
                    <button type={"submit"}>Entrer</button>
                    <button type={"button"} onClick={this.switchModeHandler}>
                        Switch to {this.state.isLogin ? "Signup" : "Login"}
                    </button>
                </div>
            </form>
        );
    }
}

export default LoginPage;