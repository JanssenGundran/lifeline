import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';  
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [CommonModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lifeline';
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isAdmin = status;
    });
  }

  logout() {
    this.authService.logout();
  }
}
