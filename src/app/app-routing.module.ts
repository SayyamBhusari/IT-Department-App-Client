import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './tickets-list/tickets-list.component';
import { AddEditTicketComponent } from './tickets-list/add-edit-ticket/add-edit-ticket.component';
import { AuthGuard } from './authentication/auth.gaurd';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent, canActivate: [AuthGuard]},
  { path: 'ticket/add', component: AddEditTicketComponent, canActivate: [AuthGuard]},
  { path: 'ticket/edit/:ticketId', component: AddEditTicketComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


