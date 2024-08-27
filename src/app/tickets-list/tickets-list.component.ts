// src/app/components/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../tickets-list/tickets-list.service';
import { Ticket } from '../models/ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  backgroundImageUrl: string = 'assets\background.jpg';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.LoadTickets();
  }

  LoadTickets(): void {
    this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
  }

  AddTicket(): void {
    this.router.navigate(['/ticket/add']);
  }

  EditTicket(ticketId: number): void {
    this.router.navigate(['/ticket/edit', ticketId]);
  }

  OnSubmit(): void {
    console.log('Form submitted');
  }

  RefreshPage(): void {
    window.location.reload();
  }

  NavigateHome() {
    this.router.navigate(['/home']);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.tickets.sort((a, b) => {
      const valueA = a[this.sortColumn as keyof Ticket] ?? '';
      const valueB = b[this.sortColumn as keyof Ticket] ?? '';

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.UpdateSortClasses();
  }

  UpdateSortClasses(): void {
    const headers = document.querySelectorAll('.ticket-table th');
    headers.forEach(header => {
      header.classList.remove('sort-asc', 'sort-desc');
      if (header.textContent != null && header.textContent.trim() === this.sortColumn) {
        header.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
      }
    });
  }
}
