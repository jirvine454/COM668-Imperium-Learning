import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from 'stream-chat-angular';
import { AuthService as env } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private themeService: ThemeService,
    public authService: env,
  ) {}

  ngOnInit(): void {}

  async signOut() {
    await this.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
