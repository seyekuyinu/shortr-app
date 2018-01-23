import { Router, Route, browserHistory } from 'react-router';
import {Meteor} from 'meteor/meteor';
import React from 'react';



import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Notfound from '../ui/Notfound';
import Login from '../ui/Login';




const unathenticatedPages = ['/','/signup'];
const authenticatedPages = ['/link'];
const onEnterPublicPage = () =>{
    if(Meteor.userId()){
        browserHistory.replace('/link');
    }
};
const onEnterPrivatePage = ()=>{
    if(!Meteor.userId()){
        browserHistory.replace('/');
    }
};

export const onAuthChange = (isAuthenticated) => {

    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unathenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    //console.log(pathname);


    if(isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/link');
    } else if(isAuthenticatedPage && !isAuthenticated){
        browserHistory.replace('/');
    }


};

export const routes = (
    <Router history={browserHistory}>

        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/link" component={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={Notfound} />


    </Router>


);