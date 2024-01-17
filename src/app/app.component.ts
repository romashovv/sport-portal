import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sport-portal';
  isDarkTheme: boolean = false;

  changeTheme(event: boolean) {
    this.isDarkTheme = event;
    console.log('is dark theme', this.isDarkTheme)
  }
}
