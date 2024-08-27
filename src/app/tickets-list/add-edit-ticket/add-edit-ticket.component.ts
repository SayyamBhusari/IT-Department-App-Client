import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../tickets-list.service';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit {
  ticketForm: FormGroup;
  isEditMode = false;
  ticketId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      raisedBy: ['', Validators.required],
      department: ['', Validators.required],
      resolvedBy: [''],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = Number(params.get('ticketId'));
      this.isEditMode = !!this.ticketId;
      if (this.isEditMode) {
        this.loadTicketData(this.ticketId);
      }
    });
  }

  loadTicketData(ticketId: number): void {
    // Fetch the ticket data using the ticketId
    this.ticketService.getTicket(ticketId).subscribe(ticket => this.ticketForm.patchValue(ticket));
  }

  saveTicket(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode) {
        // Update existing ticket
        // Example: this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).subscribe(() => this.router.navigate(['/tickets']));
      } else {
        // Add new ticket
        // Example: this.ticketService.addTicket(this.ticketForm.value).subscribe(() => this.router.navigate(['/tickets']));
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/tickets']);
  }
}
