// import React from 'react';
// import { Redirect } from 'react-router-dom';

export const auth_url = '/iauth';
export const acToken = 'access_token';
export const acTokenValMinLen = 10;
export const hashStr = 'hashVals';
export const authorized_domains = ["https://manuhegde.in","https://1c84ee1a.ngrok.io"];
export function login() {
    var hashvals = getHashVal(window.location.hash);
    if (hashvals) {
        for (var i = 0; i < hashvals.length; i++) {
            let [cookieName,
                acTokenval] = hashvals[i].split('=');
            if (cookieName === acToken && acTokenval.length > acTokenValMinLen) {
                console.log("Access token found\nSetting Cookie\nName:" + acToken + "\nValue" + acTokenval);
                setCookie(acToken, acTokenval);
                window.location.hash='';
                console.log("sdfsdfsdfsd");
                return acTokenval;
            }
        }
    }
    return false;
}


// export function redirect(to) {
//     if (to === undefined) 
//         return (<div></div>);
//     return (<Redirect to={to}/>);
// }

export function logout() {
    removeCookie(acToken);
    removeCookie(hashStr);
}
export function asyncrequest(url, func,echo) {
    var xhtr = new XMLHttpRequest();
    xhtr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(echo) console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            func(data);
        }
    };
    console.log("GET "+url);
    xhtr.open("GET", url, true);
    xhtr.send();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////cookie fucntions. faced some strange error with universal cookie////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////not used anymore///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//import Cookies from 'universal-cookie';

//const cookies = new Cookies();
//const date = new Date();




// export function goToLogin() {
//     if(window.location.hash)
//         setCookie(hashStr, window.location.hash);
//     return redirect(auth_url);
// }

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
    if(addHash===undefined)
        addHash=true;
    // in case user specifies multiple hashes
    var hashvals = hashstr.split('#');
    for (var i = 0; i < hashvals.length; i++) 
        if (!hashvals[i]) 
            hashvals.splice(i, 1);
    for ( i = 0; i < hashvals.length; i++)
    {
        hashvals[i]=hashvals[i].trim();
        hashvals[i]=hashvals[i].replace(/,\s*$/,"");
        if(addHash)
            hashvals[i]='#'+hashvals[i]; 
    }
    return hashvals;
}
