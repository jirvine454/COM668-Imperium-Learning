import { Component } from '@angular/core';
import { AuthService as auth0 } from '@auth0/auth0-angular';

@Component({
 selector: 'home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})

export class HomeComponent { 
    constructor(public authService: auth0) {}
}