import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import {AuthService} from '../services/auth-service';
import "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          // User is signed in.
          this.isAuth = true;
        } else {
        this.isAuth = false;
      }
    });
  }

  onSignOut(){
    this.authService.signoutUser();
  }
}
