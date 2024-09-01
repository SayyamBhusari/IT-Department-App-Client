import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProgressService } from '../progress/progress.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isProfileDropdownOpen = false;
  username = ''; 
  email = ''; 
  showHeader: boolean = true;
  progress: number | null = null;

  constructor(private router: Router, private progressService:ProgressService, private authService : AuthService) {
    
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/login') && !event.url.includes('/unauthorized');
      }
    });

    this.progressService.progress$.subscribe(progress => {
      this.progress = progress;
    });

    // Subscribe to user details
    this.authService.userDetails.subscribe(userDetails => {
      if (userDetails) {
        this.username = userDetails.username;
        this.email = userDetails.email;
      }
    });
  }

  ToggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  Logout(): void {
    this.isProfileDropdownOpen = false;
    localStorage.removeItem('jwtToken'); // Clear token from local storage
    this.router.navigate(['/login']); // Redirect to login page or home
  }

  RedirectToHome():void{
    this.router.navigate(['/home']); // Navigate to the Home page
  }
}
