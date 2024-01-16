import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { SignUpComponent } from './layout/sign-up/sign-up.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  },
  { path: 'league-table', component: LeagueTableComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

