import {makeAutoObservable} from 'mobx';


class AuthStore{
    loggedIn = false;
    constructor() {
        makeAutoObservable(this);
    }

    setLoggedIn(status){
        this.loggedIn = status
    }

    checkLoggedIn(){
        this.loggedIn = !!localStorage.getItem("token");
    }
}

export const authStore = new AuthStore();