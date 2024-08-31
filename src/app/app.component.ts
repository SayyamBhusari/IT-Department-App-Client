import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProgressService } from './progress/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'Your Application';
  isProfileDropdownOpen = false;
  username = 'John Doe'; // Replace with actual user data
  email = 'john.doe@example.com'; // Replace with actual user data
  showHeader: boolean = true;
  progress: number | null = null;

  constructor(private router: Router, private progressService:ProgressService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/login') && !event.url.includes('/unauthorized');
      }
    });
    this.progressService.progress$.subscribe(progress => {
      this.progress = progress;
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
