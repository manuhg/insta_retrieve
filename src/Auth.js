import Cookies from 'universal-cookie';

const cookies = new Cookies();
const date = new Date();

export const acToken='access_token';

export function setCookie(name, value, expires) {
    var minutes = 60 * 24 * 7; //1 week
    expires = (expires === undefined || expires < 1) ? minutes : expires;
    date.setTime(date.getTime() + (expires * 60 * 1000));
    cookies.set(acToken, value, { path: '/', secure: true,  expires: date  });
}

export function goToLogin() {
    setCookie('hashValue', window.location.hash);
    window.location.href = '/iauth';
}
export function isLoggedIn()
{
    if (cookies.get(acToken)) 
        return true;
    return false;
}
export function login() {
    var hash = window.location.hash;
    var [name,val] = hash.substring(1).split('=');

    if (name == acToken && val)
    {
        setCookie(acToken,val);
        return true;
    }
    return false;
}

export function logout() {
    cookies.remove(acToken);

}