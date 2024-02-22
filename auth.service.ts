import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Injectable({
    providedIn: 'root', 
})

export class FirebaseAuthService { 

    auth = getAuth();
  
    crearUser(mail: any, password: string) {
        return  createUserWithEmailAndPassword(this.auth, mail, password);
    } 
    
    loginUser(mail: any, password: string) {
        return  signInWithEmailAndPassword(this.auth, mail, password);
    }
    
    logoutUser() {
        return  signOut(this.auth);
    }
     
    /*COMUMENTACION https:
    firebase.google.com/docs/auth/web/manage-users?hl=es&authuser=0
    https://firebase.google.com/docs/auth/web/start?hl=es&authuser=0
    */
}  
