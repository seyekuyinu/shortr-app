import React from 'react';
import {Link } from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          error: ''
        };

    }


    onSubmit(e){
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9){
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser({email:email,password: password}, (err)=> {
             if(err){

                 this.setState({error: err.reason});

             }else{
                 this.setState({error: ''});

             }
        });





    }




    render(){



        return(
            <div className="boxed-view">
                <div className="boxed-view__box">

                <h1>Join the Short Lnk</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined }
                <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input name="email" ref="email" type="email" placeholder="Email"/>
                    <input name="password" type="password" placeholder="Password" ref="password"/>
                    <button className="button">Create Account</button>


                </form>
                    <p>This is the sign up page. Click here to go to the <Link to="/">login page</Link></p>

                </div>
            </div>
        );


    }




}