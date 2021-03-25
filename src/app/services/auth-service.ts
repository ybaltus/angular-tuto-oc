import {Injectable} from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";

@Injectable()
export class AuthService{

  createUser(email: string, password:string){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (userCredential)=>{
          //Signin
          let user = userCredential.user;
          resolve(user);
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  signinUser(email: string, password: string){
    return new Promise((resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          let user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          // let errorCode = error.code;
          let errorMessage = error.message;
          reject(errorMessage);
        });
    });
  }

  signoutUser(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Utilisateur déconnecté.');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}
