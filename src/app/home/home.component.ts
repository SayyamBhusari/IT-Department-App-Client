import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Your Application';

  constructor(private router: Router) {}

  navigateToTickets(): void {
    this.router.navigate(['/tickets']);
  }
}
