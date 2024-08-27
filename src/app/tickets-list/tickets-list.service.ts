import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    
    private tickets: Ticket[] = [
        { id: 1, title: 'Network Issue', description: 'Unable to connect to the network.', raisedBy: 'John Doe', department: 'IT', resolvedBy: 'Jane Smith', status: 'Resolved' },
        { id: 2, title: 'Software Installation', description: 'Need help installing software.', raisedBy: 'Alice Johnson', department: 'HR', resolvedBy: 'Mike Brown', status: 'In Progress' },
        { id: 3, title: 'Hardware Failure', description: 'Computer not powering on.', raisedBy: 'Bob Williams', department: 'Finance', resolvedBy: '', status: 'In Progress' },
    ];

    getTickets(): Observable<Ticket[]> {
        return of(this.tickets);
    }

    getTicket(id: number): Observable<Ticket> {
        const ticket = this.tickets.find(t => t.id === id);
        return of(ticket!);
    }

}
