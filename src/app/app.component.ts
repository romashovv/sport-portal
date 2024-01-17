import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sport-portal';
  isDarkTheme = false;

  changeTheme(event: boolean) {
    this.isDarkTheme = event;
  }
}
