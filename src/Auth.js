import React from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const date = new Date();

export const auth_url ='/iauth';
export const acToken='access_token';
export const acTokenValMinLen=10;
export const hashStr='hashVals';

export function setCookie(cookieName, value, expires) {
    var minutes = 60 * 24 * 7; //1 week
    expires = (expires === undefined || expires < 1) ? minutes : expires;
    date.setTime(date.getTime() + (expires * 60 * 1000));
    cookies.set(acToken, value, { path: '/', secure: true,  expires: date  });
    console.log("set cookie "+cookieName+"="+value);
}
export function getCookie(cookieName)
{
    console.log("Get cookie "+cookieName);
    return cookies.get(cookieName);
}
export function removeCookie(cookieName)
{
    cookies.remove(cookieName);
}
export function redirect(to)
{
    if(to===undefined)
        return(<div></div>);
    return (<Redirect to={to} />);
}

export function goToLogin() {
    setCookie(hashStr, window.location.hash);
    console.log("hashval:"+window.location.hash);
    return redirect(auth_url);
}
export function isLoggedIn(acTokenval)
{
    acTokenval=acTokenval||getCookie(acToken);
    if (acTokenval)
    {
        if(acTokenval.length()>acTokenValMinLen) 
            return true;
        else
            cookies.remove(acToken); //if cookie has invalid value ,remove it
    }
    return false;
}
export function getHashVal(hashstr) 
{
  if(!hashstr)
    return null;
  // in case user specifies multiple hashes
  var hashvals = hashstr.split('#');
  for (var i = 0; i < hashvals.length; i++) 
    if (!hashvals[i]) 
      hashvals.splice(i, 1);
  return hashvals;
}
export function login() {
    var hashvals=getHashVal(window.location.hash);
   if(hashvals)
   {
     for (var i = 0; i < hashvals.length; i++) 
     {
       let [cookieName,acTokenval]=hashvals[i].split('=');
       if(cookieName.equals(acToken)&&acTokenval.length()>acTokenValMinLen)
       {
        console.log("Access token found\nLogging in\nSetting Cookie\nName:"+acToken+"\nValue"+acTokenval);
        setCookie(acToken,acTokenval);
        return true;
       }
     }
   }
   return false;
}

export function logout() {
    cookies.remove(acToken);
    cookies.remove(hashStr);
}
