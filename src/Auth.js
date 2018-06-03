import React from 'react';
import {Redirect} from 'react-router-dom';
//import Cookies from 'universal-cookie';

//const cookies = new Cookies();
//const date = new Date();

export const auth_url = '/iauth';
export const acToken = 'access_token';
export const acTokenValMinLen = 10;
export const hashStr = 'hashVals';

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            var cvalue = c.substring(name.length, c.length);
            cvalue=(!cvalue||cvalue==="")?null:cvalue;
            console.log("Get cookie " + cname + "=" + cvalue);
            return cvalue;
        }
    }
    console.log("Get cookie " + cname + "=" + null);
    return null;
}
export function setCookie(cname, cvalue, exdays) {
    exdays=exdays||7;
    cvalue=(!cvalue||cvalue==="")?null:cvalue;

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
    console.log("set cookie " + cname + "=" + cvalue);
}
export function removeCookie(cname) {
    var d = new Date();
    d.setTime(0);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=0;" + expires + ";path=/;";
}
// export function setCookie(cookieName, value, expires) {
//     const cookies = new Cookies();

//     var minutes = 60 * 24 * 7; //1 week
//     expires = (expires === undefined || expires < 1)
//         ? minutes
//         : expires;
//     date.setTime(date.getTime() + (expires * 60 * 1000));
//     cookies.set(acToken, value, {
//         path: '/',
//         secure: true,
//         expires: date
//     });
//     cookies.set(acToken + "1", value, {
//         path: '/',
//         secure: true,
//         expires: date
//     });

//     console.log("set cookie " + cookieName + "=" + value);
// }
// export function getCookie(cookieName) {
//     const cookies = new Cookies();

//     //return cookies.get(cookieName);
//     var cv = cookies.get(cookieName);
//     console.log("Get cookie " + cookieName + " = " + cv);
//     return cv;
// }
// export function removeCookie(cookieName) {
//     const cookies = new Cookies();

//     cookies.remove(cookieName);
// }
export function redirect(to) {
    if (to === undefined) 
        return (
            <div></div>
        );
    return (<Redirect to={to}/>);
}

export function goToLogin() {
    if(window.location.hash)
        setCookie(hashStr, window.location.hash);
    return redirect(auth_url);
}
export function isLoggedIn(acTokenval) {
    //acTokenval=acTokenval||getCookie(acToken);
    if (!acTokenval) 
        acTokenval = getCookie(acToken);
    if (acTokenval) {
        if (acTokenval.length > acTokenValMinLen) 
            return true;
            // else     removeCookie(acToken); //if cookie has invalid value ,remove it
        }
    return false;
}
export function getHashVal(hashstr,addHash) {
    if (!hashstr) 
        return null;
    
    // in case user specifies multiple hashes
    var hashvals = hashstr.split('#');
    for (var i = 0; i < hashvals.length; i++) 
        if (!hashvals[i]) 
            hashvals.splice(i, 1);
    if(addHash)
        for ( i = 0; i < hashvals.length; i++)
            hashvals[i]='#'+hashvals[i]; 
    return hashvals;
}
export function login() {
    var hashvals = getHashVal(window.location.hash);
    if (hashvals) {
        for (var i = 0; i < hashvals.length; i++) {
            let [cookieName,
                acTokenval] = hashvals[i].split('=');
            if (cookieName === acToken && acTokenval.length > acTokenValMinLen) {
                console.log("Access token found\nLogging in\nSetting Cookie\nName:" + acToken + "\nValue" + acTokenval);
                setCookie(acToken, acTokenval);
                return true;
            }
        }
    }
    return false;
}

export function asyncrequest(url, func) {
    var xhtr = new XMLHttpRequest();
    xhtr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            func(data);
        }
    };
    console.log("GET "+url);
    xhtr.open("GET", url, true);
    xhtr.send();
}
export function logout() {
    removeCookie(acToken);
    removeCookie(hashStr);
}
