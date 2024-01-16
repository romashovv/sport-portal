import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get isLogin() {
    return this.storageService.isLogin;
  }

  constructor(private storageService: StorageService) {
  }

  logout() {
    this.storageService.deleteUser();
  }
}
