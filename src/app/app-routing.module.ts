import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './tickets-list/tickets-list.component';
import { AddEditTicketComponent } from './tickets-list/add-edit-ticket/add-edit-ticket.component';
import { AuthGuard } from './authentication/auth.gaurd';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: 'ticket/add', component: AddEditTicketComponent },
  { path: 'ticket/edit/:ticketId', component: AddEditTicketComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


