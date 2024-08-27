import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/login');
      }
    });
  }

  ToggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  Logout(): void {
    this.isProfileDropdownOpen = false;
    localStorage.removeItem('token'); // Clear token from local storage
    this.router.navigate(['/login']); // Redirect to login page or home
  }

  RedirectToHome():void{
    this.router.navigate(['/home']); // Navigate to the Home page
  }
}
