import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() changeTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  public checked: boolean = false;

  get isLogin() {
    return this.storageService.isLogin;
  }

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  logout() {
    this.storageService.deleteUser();
    this.router.navigate(['/'])
  }

  selectionChangeTheme() {
    console.log('this.checked', !this.checked)
    this.changeTheme.emit(!this.checked)
  }
}
