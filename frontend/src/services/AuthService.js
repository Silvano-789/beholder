export function doLogin(email, password){
    return new Promise((response, reject) =>{
        if(email === 'silvano789@hotmail.com' 
        && password === '123456'){
            response(true);
        }
        reject('Invalid credentials.');
    })
}

export function doLogout(){

}