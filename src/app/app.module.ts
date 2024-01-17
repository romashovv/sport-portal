import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './layout/sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PlayerComponent } from './components/player/player.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LeagueTableComponent,
    CabinetComponent,
    CalendarComponent,
    LoginComponent,
    SignUpComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    DashboardModule,
    LayoutModule,
    HttpClientModule,
    SharedModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
    // StoreModule.forRoot({reducer}),
    // EffectsModule.forRoot({}),
  ],
  providers: [MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
