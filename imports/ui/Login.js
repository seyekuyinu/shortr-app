import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {


        };
    }

    ourSubmit(e){
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
            if(err){
                this.setState({error: 'Something went wrong biko. Did you check your email and password well?'});

            }else{
                this.setState({error: ''});
            }
        });


    }

    render(){
        return(

        <div className=" boxed-view">
            <div className="boxed-view__box">
            <h1>Shortr</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.ourSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="email" name="email" ref="email" placeholder="email"/>
                <input type="password" name="password" ref="password" placeholder="Password"/>
                <button className="button">Login</button>

            </form>

            <p><Link to="/signup">Click here to sign up</Link></p>

            </div>
        </div>

        );
    }


}