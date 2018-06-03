import React from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const date = new Date();

export const auth_url ='/iauth';
export const acToken='access_token';
export const hashStr='hashVals';

export function setCookie(name, value, expires) {
    var minutes = 60 * 24 * 7; //1 week
    expires = (expires === undefined || expires < 1) ? minutes : expires;
    date.setTime(date.getTime() + (expires * 60 * 1000));
    cookies.set(acToken, value, { path: '/', secure: true,  expires: date  });
}
export function getCookie(name)
{
    return cookies.get(name);
}

export function redirect(to)
{
    if(to===undefined)
        return(<div></div>);
    return (<Redirect to={to} />);
}

export function goToLogin() {
    setCookie(hashStr, window.location.hash);
    return redirect(auth_url);
}
export function isLoggedIn()
{
    if (getCookie(acToken)) 
        return true;
    return false;
}
export function login() {
    var hash = window.location.hash;
    var [name,val] = hash.substring(1).split('=');

    if (name === acToken && val)
    {
        setCookie(acToken,val);
        return true;
    }
    return false;
}

export function logout() {
    cookies.remove(acToken);
}
